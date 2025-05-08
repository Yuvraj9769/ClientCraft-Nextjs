"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

interface ProjectStatus {
  _id: string;
  count: number;
}

export default function ProjectStatusChart({
  overData,
}: {
  overData: ProjectStatus[];
}) {
  return (
    <>
      {overData[0].count === 0 &&
      overData[0].count === 0 &&
      overData[0].count === 0 ? null : (
        <section className="mb-16">
          <div className="bg-background shadow-xl rounded-2xl p-4">
            <h2 className="text-lg font-semibold mb-4">Project Status</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={overData} barSize={40}>
                <defs>
                  <linearGradient
                    id="orangeGradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="0%" stopColor="#EA580C" />
                    <stop offset="50%" stopColor="#FB923C" />
                    <stop offset="100%" stopColor="#FED7AA" />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="_id" />
                <YAxis allowDecimals={false} />

                <Tooltip
                  contentStyle={{
                    backgroundColor: "#ffff",
                    border: "1px solid #374151",
                    color: "#000",
                    borderRadius: "8px",
                    fontSize: "14px",
                  }}
                  labelStyle={{
                    color: "#000",
                  }}
                  itemStyle={{ color: "#000" }}
                />

                <Bar
                  dataKey="count"
                  fill="url(#orangeGradient)"
                  radius={[10, 10, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </section>
      )}
    </>
  );
}
