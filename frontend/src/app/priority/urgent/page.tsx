import { Priority } from "@/state/api"
import ReusablePriorityPage from "../reusablePriorityPage"



export default function page() {
  return (
    <ReusablePriorityPage priority={Priority.Urgent} />
  )
};