
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

const data = [
  { platform: "Twitter", posts: 65 },
  { platform: "LinkedIn", posts: 45 },
  { platform: "Instagram", posts: 35 },
  { platform: "Medium", posts: 25 },
];

export const PersonaInsights = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Platform Distribution</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <XAxis dataKey="platform" />
              <YAxis />
              <Bar dataKey="posts" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};
