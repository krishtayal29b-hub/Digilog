export interface OrgContext {
  plant: { id: string; name: string; code: string };
  departments: { id: string; name: string; code: string }[];
  machines: { id: string; name: string; tag: string; status: string }[];
  myDepartmentId: string | null;
}
