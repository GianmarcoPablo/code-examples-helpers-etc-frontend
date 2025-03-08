
import { form1ApiGetById } from "@/lib/api/forms/form-1";
const page = async ({ params }: { params: { id: string } }) => {
    const { id } = await params; // Ahora se espera la resolución de params
    const { data, error } = await form1ApiGetById(id);

    if (error) return <h1>No se pudo obtener la empresa</h1>

    return (
        <h1>{id} </h1>
    )
}

export default page