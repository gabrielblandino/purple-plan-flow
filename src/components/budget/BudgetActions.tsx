import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Save, Send, CheckCircle, XCircle, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface BudgetActionsProps {
  status: string;
  userRole: string;
  isEditable: boolean;
  onSave: () => void;
  onSubmit: () => void;
  onApprove?: () => void;
  onReject?: () => void;
}

export const BudgetActions = ({
  status,
  userRole,
  isEditable,
  onSave,
  onSubmit,
  onApprove,
  onReject
}: BudgetActionsProps) => {
  const { toast } = useToast();

  const handleSave = () => {
    onSave();
    toast({
      title: "Orçamento salvo",
      description: "Suas alterações foram salvas com sucesso.",
    });
  };

  const handleSubmit = () => {
    onSubmit();
    toast({
      title: "Orçamento enviado",
      description: "O orçamento foi enviado para aprovação.",
    });
  };

  const handleApprove = () => {
    if (onApprove) {
      onApprove();
      toast({
        title: "Orçamento aprovado",
        description: "O orçamento foi aprovado com sucesso.",
      });
    }
  };

  const handleReject = () => {
    if (onReject) {
      onReject();
      toast({
        title: "Orçamento reprovado",
        description: "O orçamento foi reprovado e retornará para correção.",
        variant: "destructive",
      });
    }
  };

  const getWorkflowInfo = () => {
    switch (status) {
      case 'Draft':
        return {
          icon: <Clock className="w-4 h-4" />,
          text: "Em elaboração - salve suas alterações regularmente",
          color: "bg-muted"
        };
      case 'Submitted_to_Director':
        return {
          icon: <Clock className="w-4 h-4" />,
          text: "Aguardando aprovação do Diretor",
          color: "bg-warning"
        };
      case 'Approved_by_Director':
        return {
          icon: <CheckCircle className="w-4 h-4" />,
          text: "Aprovado pelo Diretor - Aguardando envio para CFO",
          color: "bg-success"
        };
      case 'Rejected_by_Director':
        return {
          icon: <XCircle className="w-4 h-4" />,
          text: "Reprovado pelo Diretor - Correções necessárias",
          color: "bg-destructive"
        };
      case 'Submitted_to_CFO':
        return {
          icon: <Clock className="w-4 h-4" />,
          text: "Aguardando aprovação do CFO",
          color: "bg-warning"
        };
      case 'Approved_by_CFO':
        return {
          icon: <CheckCircle className="w-4 h-4" />,
          text: "Processo concluído - Orçamento aprovado pelo CFO",
          color: "bg-success"
        };
      case 'Rejected_by_CFO':
        return {
          icon: <XCircle className="w-4 h-4" />,
          text: "Reprovado pelo CFO - Revisar com Diretor",
          color: "bg-destructive"
        };
      default:
        return {
          icon: <Clock className="w-4 h-4" />,
          text: "Status não definido",
          color: "bg-muted"
        };
    }
  };

  const workflowInfo = getWorkflowInfo();

  return (
    <Card className="mt-6">
      <CardContent className="pt-6">
        <div className="flex flex-col space-y-4">
          {/* Workflow Status */}
          <div className="flex items-center gap-2 p-3 rounded-lg bg-muted/50">
            <Badge className={`${workflowInfo.color} text-white`}>
              {workflowInfo.icon}
            </Badge>
            <span className="text-sm">{workflowInfo.text}</span>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3">
            {/* Coordinator Actions */}
            {userRole === 'Coordinator' && isEditable && (
              <>
                <Button 
                  variant="outline" 
                  onClick={handleSave}
                  className="flex items-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  Salvar Rascunho
                </Button>
                
                {status === 'Draft' && (
                  <Button 
                    onClick={handleSubmit}
                    className="flex items-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    Finalizar e Enviar para Diretor
                  </Button>
                )}
              </>
            )}

            {/* Director Actions */}
            {userRole === 'Director' && (status === 'Submitted_to_Director') && (
              <div className="flex gap-3">
                <Button 
                  variant="outline"
                  onClick={handleReject}
                  className="flex items-center gap-2"
                >
                  <XCircle className="w-4 h-4" />
                  Reprovar
                </Button>
                <Button 
                  onClick={handleApprove}
                  className="flex items-center gap-2"
                >
                  <CheckCircle className="w-4 h-4" />
                  Aprovar
                </Button>
              </div>
            )}

            {/* CFO Actions */}
            {userRole === 'CFO' && (status === 'Submitted_to_CFO') && (
              <div className="flex gap-3">
                <Button 
                  variant="outline"
                  onClick={handleReject}
                  className="flex items-center gap-2"
                >
                  <XCircle className="w-4 h-4" />
                  Reprovar
                </Button>
                <Button 
                  onClick={handleApprove}
                  className="flex items-center gap-2"
                >
                  <CheckCircle className="w-4 h-4" />
                  Aprovar
                </Button>
              </div>
            )}

            {/* Director Submit to CFO */}
            {userRole === 'Director' && status === 'Approved_by_Director' && (
              <Button 
                onClick={handleSubmit}
                className="flex items-center gap-2"
              >
                <Send className="w-4 h-4" />
                Enviar para CFO
              </Button>
            )}
          </div>

          {/* Help Text */}
          <div className="text-sm text-muted-foreground">
            {userRole === 'Coordinator' && status === 'Draft' && (
              "Preencha todos os campos necessários antes de enviar para aprovação."
            )}
            {userRole === 'Director' && (
              "Revise os orçamentos submetidos pela sua diretoria antes de aprovar."
            )}
            {userRole === 'CFO' && (
              "Análise final dos orçamentos aprovados pelos Diretores."
            )}
            {userRole === 'CEO' && (
              "Visualização completa de todos os orçamentos aprovados."
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};