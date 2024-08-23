export type SortComparable = string | number | bigint | Date;

export interface Stringable {
  toString(): string;
}

export type SortKeyGetter<T = unknown, TSortKey extends SortComparable = string> = (item: T) => TSortKey;

export const defaultSortKeyGetter: SortKeyGetter<Stringable> = (x: Stringable) => x.toString();

export function sortByPriority<T = unknown, TSortKey extends SortComparable = string>(items: T[], priorityOrder: TSortKey[], sortKeyGetter: SortKeyGetter<T, TSortKey>) {
  return items.sort((a: T, b: T) => {
    const aPriorityIndex = priorityOrder.indexOf(sortKeyGetter(a));
    const bPriorityIndex = priorityOrder.indexOf(sortKeyGetter(b));

    if (aPriorityIndex === -1) {
      if (bPriorityIndex === -1) {
        return 0;
      }

      return 1;
    }

    if (bPriorityIndex === -1) {
      return -1;
    }

    return bPriorityIndex > aPriorityIndex ? -1 : 1;
  });
}

export function sortByKey<T = unknown, TSortKey extends SortComparable = string>(items: T[], sortKeyGetter: SortKeyGetter<T, TSortKey>, desc: boolean = false): T[] {
  const directionMultiplier = desc ? -1 : 1;

  return items.sort((a, b) => {
    const aSortKey = sortKeyGetter(a);
    const bSortKey = sortKeyGetter(b);

    if (aSortKey < bSortKey) {
      return -1 * directionMultiplier;
    }

    if (aSortKey > bSortKey) {
      return 1 * directionMultiplier;
    }

    return 0;
  });
}

export function sortByKeys<T = unknown, TSortKey extends SortComparable = string>(items: T[], sortKeyGetters: SortKeyGetter<T, TSortKey>[] = [], desc: boolean = false): T[] {
  const directionMultiplier = desc ? -1 : 1;

  return sortKeyGetters.reduce(
    (accum, sortKeyGetter) =>
      accum.sort((a, b) => {
        const aSortKey = sortKeyGetter(a);
        const bSortKey = sortKeyGetter(b);

        if (aSortKey < bSortKey) {
          return -1 * directionMultiplier;
        }

        if (aSortKey > bSortKey) {
          return 1 * directionMultiplier;
        }

        return 0;
      }),
    [...items],
  );
}
