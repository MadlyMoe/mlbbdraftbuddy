import { auth } from "@/auth";
import { NextResponse } from "next/server";
import { deleteDraft, getDraft } from "@/lib/draft";

/*
 *  API Route to get individual draft by Id
 *  GET /api/draft/[draftId]
 *
 *
 *  Example Output:
 *  {
 *    "id": "cmbiwajtu0004zzcgxj2a8pft",
 *    "teamColor": "red",
 *    "teamBans": [],
 *    "enemyBans": [],
 *    "teamPicks": [],
 *    "enemyPicks": [],
 *    "createdAt": "2025-06-05T04:47:26.947Z",
 *    "updatedAt": "2025-06-05T04:47:26.947Z",
 *    "userId": "cmbivzpe10000zzvlupffgy75"
 *  }
 **/

export async function GET(
  req: Request,
  { params }: { params: Promise<{ draftId: string }> }
) {
  try {
    const session = await auth();

    // If not logged in
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { draftId } = await params;
    const draft = await getDraft(draftId, session.user?.id);

    // If no draft returned (due to userId or draftId)
    if (!draft) {
      return NextResponse.json({ status: 404 });
    }

    return NextResponse.json(draft, { status: 200 });
  } catch (err) {
    console.log("GET: /api/draft/[draftId] error: ", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

/*
 *
 *   API Route to delete a draft by ID
 *   DELETE /api/draft/[draftId]
 *
 *   Only the owner of a draft can delete it.
 *
 *   Example Success Response (200 OK):
 *   {
 *     "success": true
 *   }
 *
 *  Example Error Responses:
 *  - 401 Unauthorized: User is not logged in
 *  - 403 Forbidden: User does not own the draft
 *  - 500 Internal Server Error: Unexpected server error
 *
 */

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ draftId: string }> }
) {
  try {
    const session = await auth();

    // If not logged in
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { draftId } = await params;
    const success = await deleteDraft(draftId, session.user?.id);

    if (success) return NextResponse.json({ success: true }, { status: 200 });
    else return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  } catch (err) {
    console.log("DELETE: /api/draft/[draftId] error: ", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
