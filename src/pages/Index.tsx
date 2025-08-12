import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { Calculator, TrendingUp, Users, BarChart3 } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="w-full bg-gradient-to-r from-primary to-secondary p-8 mb-8">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl font-bold text-primary-foreground mb-4">
            Sistema de Orçamento 2026
          </h1>
          <p className="text-xl text-primary-foreground/80 mb-8">
            Planejamento orçamentário corporativo com aprovação multinível
          </p>
          <Button 
            size="lg" 
            variant="secondary"
            onClick={() => navigate('/budget')}
            className="text-lg px-8 py-6"
          >
            Acessar Orçamento
          </Button>
        </div>
      </div>

      {/* Features */}
      <div className="container mx-auto px-4 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader>
              <Calculator className="w-12 h-12 mx-auto text-primary mb-2" />
              <CardTitle>Orçamento Geral</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Planejamento detalhado por conta contábil com valores mensais
              </p>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader>
              <Users className="w-12 h-12 mx-auto text-primary mb-2" />
              <CardTitle>Despesas de Pessoal</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Gestão completa de colaboradores, salários e benefícios
              </p>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader>
              <TrendingUp className="w-12 h-12 mx-auto text-primary mb-2" />
              <CardTitle>Aprovação Multinível</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Fluxo estruturado: Coordenador → Diretor → CFO
              </p>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader>
              <BarChart3 className="w-12 h-12 mx-auto text-primary mb-2" />
              <CardTitle>Dashboards</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Visões consolidadas por unidade e diretoria
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Process Flow */}
        <Card className="mt-12">
          <CardHeader>
            <CardTitle className="text-center text-2xl">Fluxo do Processo</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row justify-center items-center gap-4 md:gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold text-xl mb-2 mx-auto">
                  1
                </div>
                <h3 className="font-semibold">Coordenador</h3>
                <p className="text-sm text-muted-foreground">Preenche orçamento</p>
              </div>
              
              <div className="hidden md:block text-primary text-2xl">→</div>
              <div className="md:hidden text-primary text-2xl">↓</div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold text-xl mb-2 mx-auto">
                  2
                </div>
                <h3 className="font-semibold">Diretor</h3>
                <p className="text-sm text-muted-foreground">Aprova/Reprova</p>
              </div>
              
              <div className="hidden md:block text-primary text-2xl">→</div>
              <div className="md:hidden text-primary text-2xl">↓</div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold text-xl mb-2 mx-auto">
                  3
                </div>
                <h3 className="font-semibold">CFO</h3>
                <p className="text-sm text-muted-foreground">Aprovação final</p>
              </div>
              
              <div className="hidden md:block text-primary text-2xl">→</div>
              <div className="md:hidden text-primary text-2xl">↓</div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-success rounded-full flex items-center justify-center text-success-foreground font-bold text-xl mb-2 mx-auto">
                  ✓
                </div>
                <h3 className="font-semibold">CEO</h3>
                <p className="text-sm text-muted-foreground">Consulta final</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;
