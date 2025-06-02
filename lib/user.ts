'use server';

const register = async (formData: FormData) => {
  const username = formData.get('username') as string;
  console.log(username);
};

// Open Prisma and create User + Account?

export { register };
