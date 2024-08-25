import prisma from '@/prisma/client';
import { ITEMS_PER_PAGE } from '@/app/lib/constants';
import { getUserBySession } from '@/app/data/session';

export const getCircuits = async () => {
  try {
    const user = await getUserBySession();

    const circuits = await prisma.circuit.findMany({
      where: {
        companyId: String(user.companyId),
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
    const user = await getUserBySession();
    const circuit = await prisma.circuit.findUnique({
      where: { companyId: String(user.companyId), id },
      include: { vendor: true, location1: true, location2: true },
    });
    return circuit;
  } catch (error) {
    throw new Error('Failewd to Fetch Circuit.');
  }
};

export const getCircuitPages = async () => {
  try {
    const user = await getUserBySession();
    const count = await prisma.circuit.count({ where: { companyId: String(user.companyId) } });
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
    const user = await getUserBySession();
    const circuits = await prisma.circuit.findMany({
      where: {
        companyId: String(user.companyId),
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
