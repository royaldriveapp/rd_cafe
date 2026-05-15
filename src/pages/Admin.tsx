import { Link } from "react-router-dom";
import { Lock } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const Admin = () => {
  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-b from-secondary/25 to-background px-4 pt-32">
        <div className="mx-auto max-w-3xl">
          <Card className="border-border/50 shadow-xl">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
                <Lock className="h-8 w-8 text-primary" />
              </div>
              <CardTitle className="text-3xl font-serif">Legacy Admin Retired</CardTitle>
              <CardDescription className="mx-auto max-w-xl text-base leading-7">
                This older dashboard is disabled on the live site because it depended on client-side demo
                authentication and local-only data.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="rounded-2xl border border-[#eadccc] bg-[#fffaf2] p-5">
                <p className="font-sohne text-sm leading-7 text-[#6c5a4d]">
                  Content editing now happens through the protected Sanity workspace. That keeps public users away
                  from fake admin credentials and moves real access control into Sanity user invites and roles.
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <Button asChild>
                  <Link to="/cafe-admin">Open Cafe Admin</Link>
                </Button>
                <Button asChild variant="outline">
                  <Link to="/">Return to homepage</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Admin;
