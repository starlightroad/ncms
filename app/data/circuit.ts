import prisma from '@/prisma/client';

export const getCircuits = async () => {
  try {
    const circuits = await prisma.circuit.findMany({
      include: {
        vendor: true,
        location1: true,
        location2: true,
      },
    });
    return circuits;
  } catch (error) {
    throw new Error('Failed to Fetch Circuits.');
  }
};

export const getCircuit = async (id: string) => {
  try {
    const circuit = await prisma.circuit.findUnique({
      where: { id },
      include: { vendor: true, location1: true, location2: true },
    });
    return circuit;
  } catch (error) {
    throw new Error('Failewd to Fetch Circuit.');
  }
};
