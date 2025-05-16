// src/app/players/new/page.tsx
'use client';

import { useState } from 'react';
import { Button, LinkButton } from '@/components/ui/button';
import { PlayersAPI } from '@/libs/api';  // Assuming this is your API handler
import { UserPlus, Loader } from 'lucide-react';

export default function NewPlayerPage() {
  // State to manage the player name input
  const [name, setName] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  // Handle form input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Player name is required.');
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      // Assuming `PlayersAPI.create` is your function to call the API
      const newPlayer = await PlayersAPI.create({name : name});
      setSuccess(true);
      setName('');
    } catch (err) {
      setError('Failed to create player. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-4">Add a New Player</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="player-name" className="block text-sm font-medium text-gray-700">
            Player Name
          </label>
          <input
            id="player-name"
            type="text"
            value={name}
            onChange={handleInputChange}
            className="mt-1 p-2 border border-gray-300 rounded w-full"
            placeholder="Enter player's name"
          />
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}
        {success && <p className="text-green-500 text-sm">Player created successfully!</p>}

        <div className="flex justify-between">
          <Button type="submit" disabled={loading} className="flex items-center">
            {loading ? <Loader className="animate-spin mr-2" size={16} /> : <UserPlus className="mr-2" />}
            {loading ? 'Creating...' : 'Create Player'}
          </Button>
        </div>
      </form>

      <div className="mt-4">
        <LinkButton href="/players" className="text-blue-500 hover:underline">
          Back to Players List
        </LinkButton>
      </div>
    </div>
  );
}
