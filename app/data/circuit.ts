import prisma from '@/prisma/client';
import { ITEMS_PER_PAGE } from '@/app/lib/constants';
import { getDemoCompanyId } from '@/app/data/demo';

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

export const getCircuitPages = async () => {
  try {
    const count = await prisma.circuit.count();
    const pages = Math.ceil(count / ITEMS_PER_PAGE);

    return pages;
  } catch (error) {
    throw new Error('Failed to Fetch Number of Circuits.');
  }
};

export const getFilteredCircuits = async (currentPage: number, query: string) => {
  const demoCompanyId = await getDemoCompanyId();
  const skip = (currentPage - 1) * ITEMS_PER_PAGE;
  const take = currentPage * ITEMS_PER_PAGE;

  try {
    const circuits = await prisma.circuit.findMany({
      where: {
        companyId: demoCompanyId,
        OR: [
          {
            cid: {
              startsWith: query,
              mode: 'insensitive',
            },
          },
          {
            vendor: {
              name: {
                startsWith: query,
                mode: 'insensitive',
              },
            },
          },
          {
            location1: {
              name: {
                startsWith: query,
                mode: 'insensitive',
              },
            },
          },
          {
            location2: {
              name: {
                startsWith: query,
                mode: 'insensitive',
              },
            },
          },
        ],
      },
      include: {
        vendor: true,
        location1: true,
        location2: true,
      },
      skip,
      take,
    });
    return circuits;
  } catch (error) {
    throw new Error('Failed to Get Filtered Circuits.');
  }
};
