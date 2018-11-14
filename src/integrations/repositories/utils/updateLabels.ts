import {List, Set} from "immutable";

export function updateLabels(labels: string[], addLabels: string[], removeLabels: string[]): string {
  return List(labels)
    .concat(addLabels)
    .filter((label) => !Set(removeLabels).contains(label))
    .toSet()
    .join(",");
}
