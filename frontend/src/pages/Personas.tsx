import { PersonaActions } from "@/components/personas/PersonaActions";
import { PersonaInsights } from "@/components/personas/PersonaInsights";
import { PersonaMetrics } from "@/components/personas/PersonaMetrics";
import { Helmet } from "react-helmet";

const Personas = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <Helmet>
        <title>Manage Personas - Segmint</title>
        <meta
          name="description"
          content="View and manage your content creation personas"
        />
      </Helmet>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-9">
          <div className="grid gap-6">
            <PersonaMetrics />
            <PersonaActions onEditClick={() => {}} />
            <PersonaInsights />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Personas;
