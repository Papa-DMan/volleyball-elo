// src/app/players/page.tsx
'use client';

// import { act, useEffect, useState } from 'react';
import { useEffect, useState } from 'react';
// import { useSearchParams } from 'next/navigation';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Button, LinkButton } from '@/components/ui/button';
import { PlayersAPI } from '@/libs/api';
import { Player } from '@/libs/types';
import PlayersList from '@/components/players/player-list';
import { UserPlus, Loader } from 'lucide-react';
import { useSearchParams } from 'next/navigation';

export default function PlayersPage() {
  const [players, setPlayers] = useState<Player[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const searchParams = useSearchParams();
  const activeFilter = searchParams.get('active');

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        setLoading(true);
        const params: { active?: boolean } = {};
        
        if (activeFilter === 'true') {
          params.active = true;
        } else if (activeFilter === 'false') {
          params.active = false;
        }
        
        const response = await PlayersAPI.getAll(params);
        console.log(response)
        setPlayers(response.data);
      } catch (err) {
        setError('Failed to load players. Please try again later.');
        console.error('Error fetching players:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPlayers();
  }, [activeFilter]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Players</h1>
        <LinkButton href="/players/new" size="sm">
          <UserPlus className="w-4 h-4 mr-2" />
          Add Player
        </LinkButton>
      </div>
      
      <div className="flex gap-2 mb-4">
        <LinkButton 
          href="/players" 
          variant={!activeFilter ? 'primary' : 'outline'}
          size="sm"
        >
          All Players
        </LinkButton>
        <LinkButton 
          href="/players?active=true" 
          variant={activeFilter === 'true' ? 'primary' : 'outline'}
          size="sm"
        >
          Active Players
        </LinkButton>
        <LinkButton 
          href="/players?active=false" 
          variant={activeFilter === 'false' ? 'primary' : 'outline'}
          size="sm"
        >
          Inactive Players
        </LinkButton>
      </div>

      <Card>
        <CardHeader 
          title="Player Roster" 
          description={
            activeFilter === 'true' 
              ? 'Currently active players' 
              : activeFilter === 'false' 
                ? 'Currently inactive players' 
                : 'All registered players'
          } 
        />
        <CardContent className="p-0">
          {loading ? (
            <div className="flex justify-center items-center p-8">
              <Loader className="w-8 h-8 animate-spin text-indigo-600" />
            </div>
          ) : error ? (
            <div className="p-6 text-center">
              <p className="text-red-500">{error}</p>
              <Button 
                variant="outline" 
                className="mt-4"
                onClick={() => window.location.reload()}
              >
                Try Again
              </Button>
            </div>
          ) : players.length === 0 ? (
            <div className="text-center p-6">
              <p className="text-gray-500">No players found</p>
              <LinkButton href="/players/new" className="mt-4">
                Add Your First Player
              </LinkButton>
            </div>
          ) : (
            <PlayersList players={players} />
          )}
        </CardContent>
      </Card>
    </div>
  );
}