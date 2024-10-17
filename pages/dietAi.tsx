'use client'

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function DietAI() {
  const [userInfo, setUserInfo] = useState({
    gender: '',
    height: '',
    weight: '',
    dietPreference: ''
  })
  const [image, setImage] = useState<string | null>(null)
  const [analysis, setAnalysis] = useState<string | null>(null)

  const handleInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value })
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setImage(e.target?.result as string)
      }
      reader.readAsDataURL(e.target.files[0])
    }
  }

  const analyzeImage = async () => {
    // This is a placeholder for the AI analysis
    // In a real app, you would call an API here
    await new Promise(resolve => setTimeout(resolve, 1000)) // Simulate API call
    setAnalysis("Based on the image and your information, we recommend eating 75% of this meal.")
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Diet AI</h1>
      
      <Card className="mb-4">
        <CardHeader>
          <CardTitle>User Information</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="gender">Gender</Label>
                <Select onValueChange={(value) => setUserInfo({ ...userInfo, gender: value })}>
                  <SelectTrigger id="gender">
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="height">Height (cm)</Label>
                <Input id="height" name="height" type="number" value={userInfo.height} onChange={handleInfoChange} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="weight">Weight (kg)</Label>
                <Input id="weight" name="weight" type="number" value={userInfo.weight} onChange={handleInfoChange} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="dietPreference">Diet Preference</Label>
                <Select onValueChange={(value) => setUserInfo({ ...userInfo, dietPreference: value })}>
                  <SelectTrigger id="dietPreference">
                    <SelectValue placeholder="Select diet" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="balanced">Balanced</SelectItem>
                    <SelectItem value="lowCarb">Low Carb</SelectItem>
                    <SelectItem value="highProtein">High Protein</SelectItem>
                    <SelectItem value="vegetarian">Vegetarian</SelectItem>
                    <SelectItem value="vegan">Vegan</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>

      <Card className="mb-4">
        <CardHeader>
          <CardTitle>Meal Image Upload</CardTitle>
        </CardHeader>
        <CardContent>
          <Input id="image" type="file" accept="image/*" onChange={handleImageUpload} className="mb-4" />
          {image && (
            <div className="mt-4">
              <img height={20} width={20} src={image} alt="Uploaded meal" className="max-w-full h-auto rounded-lg" />
            </div>
          )}
        </CardContent>
      </Card>

      <Button onClick={analyzeImage} disabled={!image || !userInfo.gender || !userInfo.height || !userInfo.weight || !userInfo.dietPreference}>
        Analyze Meal
      </Button>

      {analysis && (
        <Card className="mt-4">
          <CardHeader>
            <CardTitle>AI Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{analysis}</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}