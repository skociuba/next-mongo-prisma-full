import {NextResponse} from 'next/server';

import {prisma} from '../../../prisma/index';

async function main() {
  try {
    await prisma.$connect();
  } catch (err) {
    return Error('Database Connection Unsuccessull');
  }
}

export const GET = async () => {
  try {
    await main();

    const form = await prisma.form.findMany();

    return NextResponse.json({message: 'Success', form}, {status: 200});
  } catch (err) {
    return NextResponse.json({message: 'Error', err}, {status: 500});
  } finally {
    await prisma.$disconnect();
  }
};

export const POST = async (request: Request) => {
  try {
    await main();
    const formData = await request.json();
    const form = await prisma.form.create({
      data: formData,
    });

    return NextResponse.json({message: 'Add Success', form}, {status: 200});
  } catch (err) {
    return NextResponse.json({message: 'Error', err}, {status: 500});
  } finally {
    await prisma.$disconnect();
  }
};
