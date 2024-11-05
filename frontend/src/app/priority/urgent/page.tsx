import { Priority } from "@/state/api"
import ReusablePriorityPage from "../reusablePriorityPage"

type Props = {}

export default function page({}: Props) {
  return (
    <ReusablePriorityPage priority={Priority.Urgent} />
  )
};