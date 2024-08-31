import prisma from '@/prisma/client';

export async function GET(req: Request, res: Response) {
  const authToken = req.headers.get('Authorization')?.split(' ')[1];

  if (!authToken || authToken !== process.env.ADMIN_API_KEY) {
    return Response.json(
      {
        ok: false,
        message: 'Invalid API Token',
      },
      { status: 401 },
    );
  }

  try {
    const companies = await prisma.company.findMany();

    return Response.json({
      ok: true,
      data: companies,
    });
  } catch (error) {
    console.log(error instanceof Error && error.message);

    return Response.json({
      ok: false,
      message: 'Failed to Get Companies',
    });
  }
}

export async function POST(req: Request, res: Response) {
  const body = await req.json();
  const companyName: string = body.name;
  const authToken = req.headers.get('Authorization')?.split(' ')[1];

  if (!authToken || authToken !== process.env.ADMIN_API_KEY) {
    return Response.json(
      {
        ok: false,
        message: 'Invalid API Token',
      },
      { status: 401 },
    );
  }

  try {
    const newCompany = await prisma.company.create({
      data: {
        name: companyName,
      },
    });
  } catch (error) {
    console.log(error instanceof Error && error.message);

    return Response.json({
      ok: false,
      message: 'Failed to Create Company',
    });
  }

  return Response.json(null, { status: 201 });
}

export async function PATCH(req: Request, res: Response) {
  const body = await req.json();
  const companyId: string = body.companyId?.trim();
  const companyName: string = body.name?.trim();
  const authToken = req.headers.get('Authorization')?.split(' ')[1];

  if (!authToken || authToken !== process.env.ADMIN_API_KEY) {
    return Response.json(
      {
        ok: false,
        message: 'Invalid API Token',
      },
      { status: 401 },
    );
  }

  try {
    const data = await prisma.company.update({
      where: {
        id: companyId,
      },
      data: {
        name: companyName,
      },
    });

    return Response.json({
      ok: true,
      data: {
        name: data.name,
      },
    });
  } catch (error) {
    console.log(error instanceof Error && error.message);

    return Response.json({
      ok: false,
      message: 'Failed to Update Company.',
    });
  }
}
