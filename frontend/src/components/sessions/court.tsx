import { Player } from "@/libs/types";
import React from "react";

interface CourtProps {
  team_1? : Player[]
  team_2? : Player[]
  className? : string
}

export default function Court({ team_1 = [], team_2 = [], className = '' } : CourtProps) {
  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <div className="bg-green-200 border-4 border-white rounded-2xl shadow-lg">
        <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-white min-h-[400px]">
          {/* Team 1 Side */}
          <div className="flex flex-col items-center justify-center p-4">
            <h2 className="text-xl font-bold mb-4">Team 1</h2>
            <ul className="space-y-2">
              {team_1.map((player, index) => (
                <li key={index} className="text-center text-base">{player.name}</li>
              ))}
            </ul>
          </div>

          {/* Team 2 Side */}
          <div className="flex flex-col items-center justify-center p-4">
            <h2 className="text-xl font-bold mb-4">Team 2</h2>
            <ul className="space-y-2">
              {team_2.map((player, index) => (
                <li key={index} className="text-center text-base">{player.name}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
} 
