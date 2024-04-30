import { useRouter } from "next/router"
export default function Index(){
  const router = useRouter()
  console.log(router.query.id)
  return <div>test</div>
}