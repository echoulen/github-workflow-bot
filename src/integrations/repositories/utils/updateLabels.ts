import {List, Set} from "immutable";

export function updateLabels(labels: List<string>, addLabels: string[], removeLabels: string[]): string {
  return labels
    .concat(addLabels)
    .filter((label) => !Set(removeLabels).contains(label))
    .toSet()
    .join(",");
}
