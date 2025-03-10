import { Form1Edit } from "@/components/features/forms/form-1-edit";
import { Form1Preview } from "@/components/features/forms/form-1-preview";
import { form1ApiGetById } from "@/lib/api/forms/form-1";

const page = async ({ params }: { params: { id: string } }) => {
    const { id } = await params;
    const { data: company, error } = await form1ApiGetById(id);

    if (error) return <h1>No se pudo obtener la empresa</h1>;

    return (
        <div className="grid gap-6 md:grid-cols-2">
            <div>
                <Form1Edit company={company} />
            </div>
            <div>
                <Form1Preview defaultCompany={company} />
            </div>
        </div>
    );
};

export default page;