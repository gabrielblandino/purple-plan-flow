import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BudgetHeader } from "@/components/budget/BudgetHeader";
import { BudgetTable } from "@/components/budget/BudgetTable";
import { PersonnelTab } from "@/components/budget/PersonnelTab";
import { BudgetActions } from "@/components/budget/BudgetActions";

// Mock data - In a real app, this would come from your database
const mockAccounts = [
  {
    account_code: "3.10.1.01",
    account_name: "Material de Escritório",
    account_category: "Despesas Operacionais",
    values: [5000, 5000, 5000, 5000, 5000, 5000, 5000, 5000, 5000, 5000, 5000, 5000],
    comments: "",
    isPersonnelCost: false
  },
  {
    account_code: "3.10.2.01",
    account_name: "Telefone e Internet",
    account_category: "Despesas Operacionais",
    values: [3000, 3000, 3000, 3000, 3000, 3000, 3000, 3000, 3000, 3000, 3000, 3000],
    comments: "",
    isPersonnelCost: false
  },
  {
    account_code: "3.10.9.01",
    account_name: "Salários",
    account_category: "Despesa de Pessoal",
    values: [50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 100000],
    comments: "Calculado automaticamente",
    isPersonnelCost: true
  },
  {
    account_code: "3.10.9.02",
    account_name: "Benefícios",
    account_category: "Despesa de Pessoal",
    values: [15000, 15000, 15000, 15000, 15000, 15000, 15000, 15000, 15000, 15000, 15000, 15000],
    comments: "Calculado automaticamente",
    isPersonnelCost: true
  }
];

const mockEmployees = [
  {
    employee_id: "EMP001",
    employee_name: "João Silva",
    coordination: "Coordenação A",
    base_salary: 8000,
    hire_month: "2026-01",
  },
  {
    employee_id: "EMP002",
    employee_name: "Maria Santos",
    coordination: "Coordenação A",
    base_salary: 7500,
    hire_month: "2026-01",
  },
  {
    employee_id: "EMP003",
    employee_name: "Carlos Oliveira",
    coordination: "Coordenação A",
    base_salary: 9000,
    hire_month: "2026-03",
  }
];

const Budget = () => {
  const [accounts, setAccounts] = useState(mockAccounts);
  const [employees, setEmployees] = useState(mockEmployees);
  
  // Mock user data - In a real app, this would come from authentication
  const userData = {
    userRole: "Coordinator",
    coordination: "Coordenação A",
    year: 2026,
    status: "Draft"
  };

  const isEditable = userData.status === 'Draft' || userData.status === 'Rejected_by_Director' || userData.status === 'Rejected_by_CFO';

  const handleUpdateValue = (accountCode: string, monthIndex: number, value: number) => {
    setAccounts(prev => prev.map(account => 
      account.account_code === accountCode 
        ? {
            ...account,
            values: account.values.map((val, index) => 
              index === monthIndex ? value : val
            )
          }
        : account
    ));
  };

  const handleUpdateComment = (accountCode: string, comment: string) => {
    setAccounts(prev => prev.map(account => 
      account.account_code === accountCode 
        ? { ...account, comments: comment }
        : account
    ));
  };

  const handleUpdateEmployee = (updatedEmployee: any) => {
    setEmployees(prev => prev.map(emp => 
      emp.employee_id === updatedEmployee.employee_id 
        ? updatedEmployee 
        : emp
    ));
  };

  const handleAddEmployee = (newEmployee: any) => {
    const employeeWithId = {
      ...newEmployee,
      employee_id: `EMP${String(employees.length + 1).padStart(3, '0')}`,
      coordination: userData.coordination
    };
    setEmployees(prev => [...prev, employeeWithId]);
  };

  const handleSave = () => {
    // In a real app, save to database
    console.log("Saving budget data...");
  };

  const handleSubmit = () => {
    // In a real app, update status and save to database
    console.log("Submitting budget for approval...");
  };

  const handleApprove = () => {
    console.log("Approving budget...");
  };

  const handleReject = () => {
    console.log("Rejecting budget...");
  };

  return (
    <div className="min-h-screen bg-background">
      <BudgetHeader 
        userRole={userData.userRole}
        coordination={userData.coordination}
        year={userData.year}
        status={userData.status}
      />
      
      <div className="container mx-auto px-4 pb-8">
        <Tabs defaultValue="general" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="general">Orçamento Geral</TabsTrigger>
            <TabsTrigger value="personnel">Despesas de Pessoal</TabsTrigger>
          </TabsList>
          
          <TabsContent value="general" className="space-y-6">
            <BudgetTable
              accounts={accounts}
              onUpdateValue={handleUpdateValue}
              onUpdateComment={handleUpdateComment}
              isEditable={isEditable}
            />
          </TabsContent>
          
          <TabsContent value="personnel" className="space-y-6">
            <PersonnelTab
              employees={employees}
              isEditable={isEditable}
              onUpdateEmployee={handleUpdateEmployee}
              onAddEmployee={handleAddEmployee}
            />
          </TabsContent>
        </Tabs>

        <BudgetActions
          status={userData.status}
          userRole={userData.userRole}
          isEditable={isEditable}
          onSave={handleSave}
          onSubmit={handleSubmit}
          onApprove={handleApprove}
          onReject={handleReject}
        />
      </div>
    </div>
  );
};

export default Budget;