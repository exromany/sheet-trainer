import Link from "next/link";
import { SiteLayout } from "@/components/layout/site-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function Home() {
  return (
    <SiteLayout>
      <div className="flex flex-col gap-12 items-center max-w-4xl w-full">
        {/* Hero Section */}
        <section className="text-center space-y-4 pt-8">
          <h1 className="text-5xl font-bold tracking-tight">Master Sheet Music Reading</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Improve your sight-reading skills with interactive practice exercises. From single notes
            to complex chords, train at your own pace.
          </p>
        </section>

        {/* Practice Modes */}
        <section className="w-full space-y-6">
          <h2 className="text-3xl font-bold text-center">Practice Modes</h2>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Note Recognition */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle>Note Recognition</CardTitle>
                <CardDescription>Learn to identify individual notes on the staff</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
                  <li>Multiple difficulty levels</li>
                  <li>Treble and bass clef support</li>
                  <li>Multiple choice or keyboard input</li>
                  <li>Track your progress</li>
                </ul>
                <Link href="/practice/note-recognition">
                  <Button className="w-full" size="lg">
                    Start Practice
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Coming Soon - Interval Training */}
            <Card className="opacity-75">
              <CardHeader>
                <CardTitle>Interval Training</CardTitle>
                <CardDescription>Recognize intervals between two notes</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
                  <li>Major and minor intervals</li>
                  <li>Perfect intervals</li>
                  <li>Augmented and diminished</li>
                  <li>Progressive difficulty</li>
                </ul>
                <Button className="w-full" size="lg" disabled>
                  Coming Soon
                </Button>
              </CardContent>
            </Card>

            {/* Coming Soon - Chord Recognition */}
            <Card className="opacity-75">
              <CardHeader>
                <CardTitle>Chord Recognition</CardTitle>
                <CardDescription>Identify chord types and inversions</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
                  <li>Major and minor triads</li>
                  <li>Seventh chords</li>
                  <li>Chord inversions</li>
                  <li>Extended chords</li>
                </ul>
                <Button className="w-full" size="lg" disabled>
                  Coming Soon
                </Button>
              </CardContent>
            </Card>

            {/* Coming Soon - Rhythm Reading */}
            <Card className="opacity-75">
              <CardHeader>
                <CardTitle>Rhythm Reading</CardTitle>
                <CardDescription>Practice reading rhythmic patterns</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
                  <li>Note duration recognition</li>
                  <li>Time signatures</li>
                  <li>Syncopation and ties</li>
                  <li>Polyrhythms</li>
                </ul>
                <Button className="w-full" size="lg" disabled>
                  Coming Soon
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Features */}
        <section className="w-full space-y-6">
          <h2 className="text-3xl font-bold text-center">Features</h2>

          <div className="grid md:grid-cols-3 gap-6 text-center">
            <div className="space-y-2">
              <div className="text-4xl">🎹</div>
              <h3 className="font-semibold">Flexible Input</h3>
              <p className="text-sm text-muted-foreground">
                Practice with multiple choice, virtual keyboard, or MIDI controller
              </p>
            </div>

            <div className="space-y-2">
              <div className="text-4xl">📊</div>
              <h3 className="font-semibold">Track Progress</h3>
              <p className="text-sm text-muted-foreground">
                Monitor your accuracy and improvement over time
              </p>
            </div>

            <div className="space-y-2">
              <div className="text-4xl">🎯</div>
              <h3 className="font-semibold">Adaptive Difficulty</h3>
              <p className="text-sm text-muted-foreground">
                Start easy and progress to advanced sight-reading
              </p>
            </div>
          </div>
        </section>
      </div>
    </SiteLayout>
  );
}
