import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const CTA = () => {
  return (
    <section className="container px-4 py-16 mx-auto">
      <div className="rounded-xl bg-muted/50 p-8 md:p-12 lg:p-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-background/0 z-0" />
        <div className="relative z-10 max-w-2xl">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
            Ready to start a new project?
          </h2>
          <p className="mt-4 text-muted-foreground">
            Create a new project and start tracking your progress. Invite team
            members and collaborate efficiently.
          </p>
          <Button className="mt-6" size="lg">
            Create New Project
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CTA;
