import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, UserMinus, TrendingUp } from "lucide-react";

interface Employee {
  employee_id: string;
  employee_name: string;
  coordination: string;
  base_salary: number;
  hire_month: string;
  termination_month?: string;
  salary_increase?: string;
}

interface PersonnelTabProps {
  employees: Employee[];
  isEditable: boolean;
  onUpdateEmployee: (employee: Employee) => void;
  onAddEmployee: (employee: Omit<Employee, 'employee_id'>) => void;
}

const months = [
  { value: '2026-01', label: 'Janeiro 2026' },
  { value: '2026-02', label: 'Fevereiro 2026' },
  { value: '2026-03', label: 'Março 2026' },
  { value: '2026-04', label: 'Abril 2026' },
  { value: '2026-05', label: 'Maio 2026' },
  { value: '2026-06', label: 'Junho 2026' },
  { value: '2026-07', label: 'Julho 2026' },
  { value: '2026-08', label: 'Agosto 2026' },
  { value: '2026-09', label: 'Setembro 2026' },
  { value: '2026-10', label: 'Outubro 2026' },
  { value: '2026-11', label: 'Novembro 2026' },
  { value: '2026-12', label: 'Dezembro 2026' },
];

export const PersonnelTab = ({ 
  employees, 
  isEditable, 
  onUpdateEmployee, 
  onAddEmployee 
}: PersonnelTabProps) => {
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [newEmployee, setNewEmployee] = useState({
    employee_name: '',
    coordination: '',
    base_salary: 0,
    hire_month: '2026-01'
  });
  const [salaryIncrease, setSalaryIncrease] = useState({
    month: '2026-01',
    percentage: 0
  });
  const [terminationMonth, setTerminationMonth] = useState('2026-01');

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const calculateMonthlyCosts = (employee: Employee) => {
    const costs = new Array(12).fill(0);
    const hireMonth = parseInt(employee.hire_month.split('-')[1]);
    const termMonth = employee.termination_month ? 
      parseInt(employee.termination_month.split('-')[1]) : 13;
    
    let currentSalary = employee.base_salary;
    
    // Check for salary increase
    if (employee.salary_increase) {
      const [increaseMonth, percentage] = employee.salary_increase.split(':');
      const increaseMonthNum = parseInt(increaseMonth.split('-')[1]);
      
      for (let month = 1; month <= 12; month++) {
        if (month >= hireMonth && month < termMonth) {
          if (month >= increaseMonthNum) {
            const increasePercentage = parseFloat(percentage.replace('%', '')) / 100;
            currentSalary = employee.base_salary * (1 + increasePercentage);
          } else {
            currentSalary = employee.base_salary;
          }
          
          // Include 13th salary in December
          costs[month - 1] = month === 12 ? currentSalary * 2 : currentSalary;
        }
      }
    } else {
      for (let month = hireMonth; month < termMonth && month <= 12; month++) {
        costs[month - 1] = month === 12 ? currentSalary * 2 : currentSalary;
      }
    }
    
    return costs;
  };

  const handleSalaryIncrease = (employee: Employee) => {
    const increaseString = `${salaryIncrease.month}:${salaryIncrease.percentage}%`;
    onUpdateEmployee({
      ...employee,
      salary_increase: increaseString
    });
    setSelectedEmployee(null);
  };

  const handleTermination = (employee: Employee) => {
    onUpdateEmployee({
      ...employee,
      termination_month: terminationMonth
    });
    setSelectedEmployee(null);
  };

  const handleAddEmployee = () => {
    onAddEmployee(newEmployee);
    setNewEmployee({
      employee_name: '',
      coordination: '',
      base_salary: 0,
      hire_month: '2026-01'
    });
  };

  const getEmployeeStatus = (employee: Employee) => {
    if (employee.termination_month) {
      return <Badge variant="destructive">Desligamento em {employee.termination_month}</Badge>;
    }
    if (employee.salary_increase) {
      const [month, percentage] = employee.salary_increase.split(':');
      return <Badge variant="secondary">Aumento de {percentage} em {month}</Badge>;
    }
    return <Badge variant="outline">Ativo</Badge>;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Despesas de Pessoal</h2>
        {isEditable && (
          <Dialog>
            <DialogTrigger asChild>
              <Button className="flex items-center gap-2">
                <Plus className="w-4 h-4" />
                Nova Contratação
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Nova Contratação</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Nome do Colaborador</Label>
                  <Input
                    id="name"
                    value={newEmployee.employee_name}
                    onChange={(e) => setNewEmployee({...newEmployee, employee_name: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="salary">Salário Base</Label>
                  <Input
                    id="salary"
                    type="number"
                    value={newEmployee.base_salary}
                    onChange={(e) => setNewEmployee({...newEmployee, base_salary: parseFloat(e.target.value)})}
                  />
                </div>
                <div>
                  <Label htmlFor="hire-month">Mês de Início</Label>
                  <Select 
                    value={newEmployee.hire_month}
                    onValueChange={(value) => setNewEmployee({...newEmployee, hire_month: value})}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {months.map((month) => (
                        <SelectItem key={month.value} value={month.value}>
                          {month.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <Button onClick={handleAddEmployee} className="w-full">
                  Adicionar Colaborador
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>

      <div className="grid gap-4">
        {employees.map((employee) => {
          const monthlyCosts = calculateMonthlyCosts(employee);
          const totalAnnualCost = monthlyCosts.reduce((sum, cost) => sum + cost, 0);

          return (
            <Card key={employee.employee_id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>{employee.employee_name}</CardTitle>
                    <p className="text-muted-foreground">
                      Salário Base: {formatCurrency(employee.base_salary)}
                    </p>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    {getEmployeeStatus(employee)}
                    <p className="text-sm font-bold">
                      Total Anual: {formatCurrency(totalAnnualCost)}
                    </p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-6 gap-2 mb-4">
                  {months.slice(0, 6).map((month, index) => (
                    <div key={month.value} className="text-center">
                      <p className="text-xs text-muted-foreground">{month.label.split(' ')[0]}</p>
                      <p className="text-sm font-medium">
                        {formatCurrency(monthlyCosts[index])}
                      </p>
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-6 gap-2 mb-4">
                  {months.slice(6, 12).map((month, index) => (
                    <div key={month.value} className="text-center">
                      <p className="text-xs text-muted-foreground">{month.label.split(' ')[0]}</p>
                      <p className="text-sm font-medium">
                        {formatCurrency(monthlyCosts[index + 6])}
                      </p>
                    </div>
                  ))}
                </div>

                {isEditable && !employee.termination_month && (
                  <div className="flex gap-2 pt-4 border-t">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm" className="flex items-center gap-1">
                          <TrendingUp className="w-3 h-3" />
                          Aumento Salarial
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Aumento Salarial - {employee.employee_name}</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div>
                            <Label>Mês do Aumento</Label>
                            <Select 
                              value={salaryIncrease.month}
                              onValueChange={(value) => setSalaryIncrease({...salaryIncrease, month: value})}
                            >
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                {months.map((month) => (
                                  <SelectItem key={month.value} value={month.value}>
                                    {month.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <Label>Percentual de Aumento (%)</Label>
                            <Input
                              type="number"
                              value={salaryIncrease.percentage}
                              onChange={(e) => setSalaryIncrease({...salaryIncrease, percentage: parseFloat(e.target.value)})}
                            />
                          </div>
                          <Button onClick={() => handleSalaryIncrease(employee)} className="w-full">
                            Aplicar Aumento
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>

                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="destructive" size="sm" className="flex items-center gap-1">
                          <UserMinus className="w-3 h-3" />
                          Desligamento
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Desligamento - {employee.employee_name}</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div>
                            <Label>Mês do Desligamento</Label>
                            <Select 
                              value={terminationMonth}
                              onValueChange={setTerminationMonth}
                            >
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                {months.map((month) => (
                                  <SelectItem key={month.value} value={month.value}>
                                    {month.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          <Button 
                            variant="destructive" 
                            onClick={() => handleTermination(employee)} 
                            className="w-full"
                          >
                            Confirmar Desligamento
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};