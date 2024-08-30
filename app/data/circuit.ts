import prisma from '@/prisma/client';
import { ITEMS_PER_PAGE } from '@/app/lib/constants';
import { getCurrentUser } from '@/app/data/user';

export const getCircuits = async () => {
  try {
    const currentUser = await getCurrentUser();

    const circuits = await prisma.circuit.findMany({
      where: {
        companyId: currentUser?.company?.id,
      },
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
    const currentUser = await getCurrentUser();
    const circuit = await prisma.circuit.findUnique({
      where: { companyId: currentUser?.company?.id, id },
      include: { vendor: true, location1: true, location2: true },
    });
    return circuit;
  } catch (error) {
    throw new Error('Failewd to Fetch Circuit.');
  }
};

export const getCircuitPages = async (query?: string) => {
  try {
    const currentUser = await getCurrentUser();
    const count = await prisma.circuit.count({
      where: {
        companyId: currentUser?.company?.id,
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
    });
    const pages = Math.ceil(count / ITEMS_PER_PAGE);

    return pages;
  } catch (error) {
    throw new Error('Failed to Fetch Number of Circuits.');
  }
};

export const getFilteredCircuits = async (currentPage: number, query: string) => {
  const skip = (currentPage - 1) * ITEMS_PER_PAGE;
  const take = currentPage * ITEMS_PER_PAGE;

  try {
    const currentUser = await getCurrentUser();
    const circuits = await prisma.circuit.findMany({
      where: {
        companyId: currentUser?.company?.id,
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
