import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface BudgetHeaderProps {
  userRole: string;
  coordination: string;
  year: number;
  status: string;
}

export const BudgetHeader = ({ userRole, coordination, year, status }: BudgetHeaderProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Draft':
        return 'bg-muted text-muted-foreground';
      case 'Submitted_to_Director':
        return 'bg-warning text-warning-foreground';
      case 'Approved_by_Director':
        return 'bg-success text-success-foreground';
      case 'Rejected_by_Director':
        return 'bg-destructive text-destructive-foreground';
      case 'Submitted_to_CFO':
        return 'bg-warning text-warning-foreground';
      case 'Approved_by_CFO':
        return 'bg-success text-success-foreground';
      case 'Rejected_by_CFO':
        return 'bg-destructive text-destructive-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="w-full bg-gradient-to-r from-primary to-secondary p-6 mb-6">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-primary-foreground mb-2">
              Orçamento {year}
            </h1>
            <p className="text-primary-foreground/80">
              {coordination} • {userRole}
            </p>
          </div>
          
          <div className="flex flex-col items-end gap-2">
            <Badge className={getStatusColor(status)}>
              {status.replace(/_/g, ' ')}
            </Badge>
            <p className="text-sm text-primary-foreground/60">
              Última atualização: {new Date().toLocaleDateString('pt-BR')}
            </p>
          </div>
        </div>

        {/* YTD Section */}
        <Card className="mt-6 bg-card/10 border-primary-foreground/20">
          <CardHeader>
            <CardTitle className="text-primary-foreground">
              Dados YTD - Setembro/2025 (Referência)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-primary-foreground">
              <div>
                <p className="text-sm opacity-80">Total Executado</p>
                <p className="text-2xl font-bold">R$ 2.456.789,00</p>
              </div>
              <div>
                <p className="text-sm opacity-80">Orçado YTD</p>
                <p className="text-2xl font-bold">R$ 2.800.000,00</p>
              </div>
              <div>
                <p className="text-sm opacity-80">Realização</p>
                <p className="text-2xl font-bold text-success">87.7%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};