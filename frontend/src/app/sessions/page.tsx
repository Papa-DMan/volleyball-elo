// src/app/sessions/page.tsx
'use client';

import { Button, LinkButton } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { PlayersAPI, SessionsAPI } from "@/libs/api";
import { Player, Session } from "@/libs/types";
import { Loader, OctagonX, Plus } from "lucide-react";
import { useEffect, useState } from "react";

export default function SessionPage() {
  const [session, setSession] = useState<Session>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [teams, setTeams] = useState<Array<Player[]>>([])
  const [players, setPlayers] = useState<Player[]>([])

  useEffect(() => {
    const fetchSession = async () => {
      try {
        setLoading(true);
        const session_id = localStorage.getItem("session_id")
        if (!session_id) {
          throw new Error("Session Not Found");
        }
        
        const response = await SessionsAPI.getById(session_id);
        setSession(response.data);
      } catch (err) {
        setError('Failed to load Session. Please try again later.');
        console.error('Error fetching session:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchSession();
  }, []);

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        setLoading(true);
        if (!session) {
          throw new Error("Session Not Found")
        }
        const response = await SessionsAPI.getPlayers(session.id)
        setPlayers(response.data)
        setError(null)
        setLoading(false);
      } catch (err) {
      }
    }
    fetchPlayers()
  }, [session])

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Sessions</h1>
        <LinkButton href="/sessions/new" size="sm" className="bg-red-600">
          <OctagonX className="w-4 h-4 mr-2" />
          End Session
        </LinkButton>
      </div>

      <Card>
        <CardHeader 
          title="Session"
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
          ) : (<></>
          )}
        </CardContent>
      </Card>
    </div>
  );
}