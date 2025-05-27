// src/app/players/new/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { Button, LinkButton } from '@/components/ui/button';
import { LocationsAPI, SessionsAPI } from '@/libs/api';  // Assuming this is your API handler
import { Loader, Check } from 'lucide-react';
import { Location } from '@/libs/types';
import NumberInput from '@/components/ui/number_input';


export default function NewSessionPage() {
  let session_id = localStorage.getItem('session_id')
  if (session_id)
    window.location.href = '/sessions'
  // State to manage the player name input
  const [location, setLocation] = useState<string>('');
  const [numCourts, setNumCourts] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const [locations, setLocations] = useState<Location[]>([]);

  // Handle form input change
  const handleLocationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    console.log(e)
    console.log(locations[e.target.selectedIndex - 1].id)
    setLocation(locations[e.target.selectedIndex - 1].id);
  };

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        setLoading(true);
        
        const response = await LocationsAPI.getAll();
        console.log(response)
        setLocations(response.data);
      } catch (err) {
        setError('Failed to load players. Please try again later.');
        console.error('Error fetching players:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchLocations();
    setLocation(locations?.length > 0 ? locations[0].id : "")
  }, []);

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!location.trim()) {
      console.error(`Invalid Location : ${location}`)
      setError('Location is required.');
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      // Assuming `PlayersAPI.create` is your function to call the API
      const newSession = await SessionsAPI.create({'location_id' : location, 'num_courts' : numCourts});
      setSuccess(true);
      setLocation('');
      setNumCourts(1)
      localStorage.setItem('session_id', newSession.data.id)
    } catch (err) {
      setError('Failed to create session. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-4">Start an open court session</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="location_id" className="block text-sm font-medium text-gray-700">
            Location
          </label>
          <div className='flex space-x-8'>
          <select id='location_id' name="location" onChange={handleLocationChange} className='min-w-64'>
            <option id=''></option>
            {locations?.map(location => (
                <option id={location.id}>{location.name}</option>
            ))}
          </select>
          <LinkButton href='/locations/new'>Add Location</LinkButton>
          </div>
        </div>
        <div>
          <label htmlFor='num_courts' className="block text-sm font-medium text-gray-700">
            Number of Courts Available
          </label>
          <NumberInput min={1} step={1} value={numCourts} setValue={setNumCourts}/>
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}
        {success && <p className="text-green-500 text-sm">Player created successfully!</p>}

        <div className="flex justify-between">
          <Button type="submit" disabled={loading} className="flex items-center">
            {loading ? <Loader className="animate-spin mr-2" size={16} /> : <Check className="mr-2" />}
            {loading ? 'Starting...' : 'Start Session'}
          </Button>
        </div>
      </form>
    </div>
  );
}
