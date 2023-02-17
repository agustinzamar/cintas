import { useIsSuperAdmin } from '@/hooks/useIsSuperAdmin';
import { useGetAllCompanies } from '@/hooks/companies/useGetAllCompanies';
import { Select } from '@/components/common/Inputs/Select';
import { useEffect, useState } from 'react';

export const CompaniesDropDown = ({ control, required, disabled }) => {
  const isSuperAdmin = useIsSuperAdmin();
  const { data: companies } = useGetAllCompanies();
  const [headquarters, setHeadquarters] = useState([]);

  useEffect(() => {
    if (companies) {
      const headquarters = companies.filter(company => !company.headquarters);
      setHeadquarters(headquarters);
    }
  }, [companies]);

  if (isSuperAdmin) {
    return (
      <Select
        control={control}
        data={headquarters}
        name="company_id"
        labelText="Empresa"
        required={required}
        disabled={disabled}
      />
    );
  }
};
