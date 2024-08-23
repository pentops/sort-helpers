import { sortByKey, sortByPriority } from '../src';

interface TennisPlayer {
  rank: number;
  name: string;
  birthDate: Date;
}

describe('Sort Helpers', () => {
  const tennisPlayers: Record<string, TennisPlayer> = {
    '1': { rank: 1, name: 'Jannik Sinner', birthDate: new Date('2001-08-16') },
    '2': { rank: 2, name: 'Novak Djoković', birthDate: new Date('1987-05-22') },
    '3': { rank: 3, name: 'Carlos Alcaraz', birthDate: new Date('2003-05-05') },
  };

  const rankSortedPlayers = [tennisPlayers['1'], tennisPlayers['2'], tennisPlayers['3']];
  const alphabeticallySortedPlayers = [tennisPlayers['3'], tennisPlayers['1'], tennisPlayers['2']];
  const birthDateSortedPlayers = [tennisPlayers['2'], tennisPlayers['1'], tennisPlayers['3']];

  it.each<[keyof TennisPlayer, TennisPlayer[]]>([
    ['rank', rankSortedPlayers],
    ['name', alphabeticallySortedPlayers],
    ['birthDate', birthDateSortedPlayers],
  ])('should sort by %s in ascending order', (key, expected) => {
    expect(sortByKey([...rankSortedPlayers], (player) => player[key])).toEqual(expected);
  });

  it.each<[keyof TennisPlayer, TennisPlayer[]]>([
    ['rank', rankSortedPlayers],
    ['name', alphabeticallySortedPlayers],
    ['birthDate', birthDateSortedPlayers],
  ])('should sort by %s in descending order', (key, expected) => {
    expect(sortByKey([...rankSortedPlayers], (player) => player[key], true)).toEqual([...expected].reverse());
  });

  it.each<[number[], TennisPlayer[]]>([
    [[1, 2, 3], rankSortedPlayers],
    [[3, 2, 1], [...rankSortedPlayers].reverse()],
  ])('should sort by specified priority order %s', (priorityOrder, expected) => {
    expect(sortByPriority([...rankSortedPlayers], priorityOrder, (player) => player.rank)).toEqual(expected);
  });
});
