import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface AccountData {
  account_code: string;
  account_name: string;
  account_category: string;
  values: number[];
  comments: string;
  isPersonnelCost: boolean;
}

interface BudgetTableProps {
  accounts: AccountData[];
  onUpdateValue: (accountCode: string, monthIndex: number, value: number) => void;
  onUpdateComment: (accountCode: string, comment: string) => void;
  isEditable: boolean;
}

const months = [
  'Jan/26', 'Fev/26', 'Mar/26', 'Abr/26', 'Mai/26', 'Jun/26',
  'Jul/26', 'Ago/26', 'Set/26', 'Out/26', 'Nov/26', 'Dez/26'
];

export const BudgetTable = ({ 
  accounts, 
  onUpdateValue, 
  onUpdateComment, 
  isEditable 
}: BudgetTableProps) => {
  const [selectedAccount, setSelectedAccount] = useState<string | null>(null);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 0
    }).format(value);
  };

  const handleValueChange = (accountCode: string, monthIndex: number, value: string) => {
    const numericValue = parseFloat(value.replace(/[^\d.-]/g, '')) || 0;
    onUpdateValue(accountCode, monthIndex, numericValue);
  };

  const getTotalForAccount = (values: number[]) => {
    return values.reduce((sum, val) => sum + val, 0);
  };

  const getTotalForMonth = (monthIndex: number) => {
    return accounts.reduce((sum, account) => sum + (account.values[monthIndex] || 0), 0);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            Orçamento Geral 2026
            {!isEditable && (
              <Badge variant="secondary">Somente Leitura</Badge>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1200px]">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left p-3 font-semibold">Conta Contábil</th>
                  {months.map((month) => (
                    <th key={month} className="text-center p-3 font-semibold min-w-[100px]">
                      {month}
                    </th>
                  ))}
                  <th className="text-center p-3 font-semibold">Total</th>
                </tr>
              </thead>
              <tbody>
                {accounts.map((account) => (
                  <tr 
                    key={account.account_code}
                    className={`border-b border-border/50 hover:bg-muted/50 transition-colors ${
                      account.isPersonnelCost ? 'bg-secondary/20' : ''
                    }`}
                  >
                    <td className="p-3">
                      <div>
                        <div className="font-medium">{account.account_code}</div>
                        <div className="text-sm text-muted-foreground">{account.account_name}</div>
                        <div className="text-xs text-muted-foreground">
                          <Badge variant="outline" className="text-xs">
                            {account.account_category}
                          </Badge>
                          {account.isPersonnelCost && (
                            <Badge variant="secondary" className="ml-1 text-xs">
                              Calculado
                            </Badge>
                          )}
                        </div>
                      </div>
                    </td>
                    {months.map((_, monthIndex) => (
                      <td key={monthIndex} className="p-3 text-center">
                        {account.isPersonnelCost || !isEditable ? (
                          <div className="text-sm font-medium">
                            {formatCurrency(account.values[monthIndex] || 0)}
                          </div>
                        ) : (
                          <Input
                            type="number"
                            value={account.values[monthIndex] || 0}
                            onChange={(e) => handleValueChange(account.account_code, monthIndex, e.target.value)}
                            className="text-center h-8 w-full"
                            step="1000"
                          />
                        )}
                      </td>
                    ))}
                    <td className="p-3 text-center font-bold">
                      {formatCurrency(getTotalForAccount(account.values))}
                    </td>
                  </tr>
                ))}
                
                {/* Total Row */}
                <tr className="border-t-2 border-primary bg-primary/10 font-bold">
                  <td className="p-3 text-lg">TOTAL GERAL</td>
                  {months.map((_, monthIndex) => (
                    <td key={monthIndex} className="p-3 text-center text-lg">
                      {formatCurrency(getTotalForMonth(monthIndex))}
                    </td>
                  ))}
                  <td className="p-3 text-center text-xl">
                    {formatCurrency(accounts.reduce((sum, account) => 
                      sum + getTotalForAccount(account.values), 0
                    ))}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Comments Section */}
      <Card>
        <CardHeader>
          <CardTitle>Comentários e Justificativas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {accounts.map((account) => (
              <div key={account.account_code} className="space-y-2">
                <label className="text-sm font-medium">
                  {account.account_code} - {account.account_name}
                </label>
                <Textarea
                  value={account.comments}
                  onChange={(e) => onUpdateComment(account.account_code, e.target.value)}
                  placeholder="Adicione comentários ou justificativas para esta conta..."
                  disabled={!isEditable}
                  className="min-h-[80px]"
                />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};