// Fake Route.ts
export async function GET(req: Request) {
  const fakeJSON = {
    heros: [
      {
        heroId: '1',
        heroName: 'Miya',
        roles: ['marksman'],
        lanes: ['gold'],
        icon: 'https://indoch.s3.ml.moonlian.com/web/madmin/image_a844f9aa51baefa6878801edd85fec5e.png',
        banner: 'https://google.com',
      },
      {
        heroId: '2',
        heroName: 'Balmond',
        roles: ['tank', 'fighter'],
        lanes: ['exp', 'jungle'],
        icon: 'https://indoch.s3.ml.moonlian.com/web/madmin/image_be884c14d560f6bc5827e2a663439f94.png',
        banner: 'https://google.com',
      },
      {
        heroId: '3',
        heroName: 'Harith',
        roles: ['tank', 'fighter'],
        lanes: ['exp', 'jungle'],
        icon: 'https://akmwebstatic.yuanzhanapp.com/web/madmin/image_6df4352d8f0d6ce429ad308d323c6206.png',
        banner: 'https://google.com',
      },
      {
        heroId: '4',
        heroName: 'Tigerial',
        roles: ['tank', 'fighter'],
        lanes: ['exp', 'jungle'],
        icon: 'https://akmwebstatic.yuanzhanapp.com/web/madmin/image_23a7a603ff9d20074777d52e2eb202f3.jpg',
        banner: 'https://google.com',
      },
      {
        heroId: '5',
        heroName: 'Jawhead',
        roles: ['tank', 'fighter'],
        lanes: ['exp', 'jungle'],
        icon: 'https://akmweb.youngjoygame.com/web/svnres/img/mlbb/homepage/100_bd87c30b6c7de6ae3b5aa56162c48c8b.png',
        banner: 'https://google.com',
      },
      {
        heroId: '6',
        heroName: 'Jawhead',
        roles: ['tank', 'fighter'],
        lanes: ['exp', 'jungle'],
        icon: 'https://akmweb.youngjoygame.com/web/svnres/img/mlbb/homepage/100_bd87c30b6c7de6ae3b5aa56162c48c8b.png',
        banner: 'https://google.com',
      },
      {
        heroId: '7',
        heroName: 'Jawhead',
        roles: ['tank', 'fighter'],
        lanes: ['exp', 'jungle'],
        icon: 'https://akmweb.youngjoygame.com/web/svnres/img/mlbb/homepage/100_bd87c30b6c7de6ae3b5aa56162c48c8b.png',
        banner: 'https://google.com',
      },
      {
        heroId: '8',
        heroName: 'Jawhead',
        roles: ['tank', 'fighter'],
        lanes: ['exp', 'jungle'],
        icon: 'https://akmweb.youngjoygame.com/web/svnres/img/mlbb/homepage/100_bd87c30b6c7de6ae3b5aa56162c48c8b.png',
        banner: 'https://google.com',
      },
    ],
  };

  return Response.json(fakeJSON);
}
