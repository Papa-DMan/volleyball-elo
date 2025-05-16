// src/components/players/player-list.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Player } from '@/libs/types';
import { 
  ChevronUp, 
  ChevronDown, 
//   UserX,
//   UserCheck,
  Edit,
  Star
} from 'lucide-react';

interface PlayerListProps {
  players: Player[];
}

export default function PlayersList({ players }: PlayerListProps) {
  const [sortField, setSortField] = useState<keyof Player>('name');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  const handleSort = (field: keyof Player) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const sortedPlayers = [...players].sort((a, b) => {
    // if (sortField === 'skillLevel') {
    //   return sortDirection === 'asc' 
    //     ? a[sortField] - b[sortField]
    //     : b[sortField] - a[sortField];
    // }
    
    // Default string comparison for other fields
    const aValue = a[sortField]?.toString() || '';
    const bValue = b[sortField]?.toString() || '';
    
    return sortDirection === 'asc'
      ? aValue.localeCompare(bValue)
      : bValue.localeCompare(aValue);
  });

  return (
    <div className="overflow-hidden">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th 
              scope="col" 
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
              onClick={() => handleSort('name')}
            >
              <div className="flex items-center">
                Name
                {sortField === 'name' && (
                  sortDirection === 'asc' ? <ChevronUp className="ml-1 h-4 w-4" /> : <ChevronDown className="ml-1 h-4 w-4" />
                )}
              </div>
            </th>
            <th 
              scope="col" 
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
            //   onClick={() => handleSort('skillLevel')}
            >
              <div className="flex items-center">
                ELO Rating
                {/* {sortField === 'skillLevel' && (
                  sortDirection === 'asc' ? <ChevronUp className="ml-1 h-4 w-4" /> : <ChevronDown className="ml-1 h-4 w-4" />
                )} */}
              </div>
            </th>
            <th 
              scope="col" 
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
            //   onClick={() => handleSort('active')}
            >
              <div className="flex items-center">
                Status
                {/* {sortField === 'active' && (
                  sortDirection === 'asc' ? <ChevronUp className="ml-1 h-4 w-4" /> : <ChevronDown className="ml-1 h-4 w-4" />
                )} */}
              </div>
            </th>
            <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {sortedPlayers.map((player) => (
            <tr key={player.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="flex-shrink-0 h-10 w-10 bg-gray-200 rounded-full flex items-center justify-center">
                    <span className="text-lg font-medium text-gray-600">
                      {player.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div className="ml-4">
                    <div className="text-sm font-medium text-gray-900">{player.name}</div>
                    {/* {player.contact && <div className="text-sm text-gray-500">{player.contact}</div>} */}
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <Star className="h-4 w-4 text-yellow-400 mr-1" />
                  <span className="text-sm font-semibold">{player.elo}</span>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {/* <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  player.active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                }`}>
                  {player.active ? (
                    <>
                      <UserCheck className="h-3 w-3 mr-1" />
                      Active
                    </>
                  ) : (
                    <>
                      <UserX className="h-3 w-3 mr-1" />
                      Inactive
                    </>
                  )}
                </span> */}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <div className="flex justify-end space-x-2">
                  <Link 
                    href={`/players/${player.id}`}
                    className="text-indigo-600 hover:text-indigo-900"
                  >
                    <span className="sr-only">View details</span>
                    <Edit className="h-4 w-4" />
                  </Link>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}