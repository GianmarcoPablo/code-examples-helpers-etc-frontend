
import { form1ApiGetById } from "@/lib/api/forms/form-1";
import { ClientComponent } from "@/components/features/forms/cliente-component";

const EditCompanyPage = async ({ params }: { params: { id: string } }) => {
    const { id } = await params;
    const { data: company, error } = await form1ApiGetById(id);


    return (
        <ClientComponent
            companyId={id}
            company={company}
            error={error}
        />
    );
};

export default EditCompanyPage;