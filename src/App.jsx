import { useState } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Label } from '@/components/ui/label.jsx'
import { Textarea } from '@/components/ui/textarea.jsx'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select.jsx'
import { Alert, AlertDescription } from '@/components/ui/alert.jsx'
import { Shield, AlertTriangle, ExternalLink, Copy, CheckCircle } from 'lucide-react'
import './App.css'

function App() {
  const [formData, setFormData] = useState({
    profileUrl: '',
    reportType: '',
    description: '',
    evidence: ''
  })
  const [showInstructions, setShowInstructions] = useState(false)
  const [copied, setCopied] = useState(false)

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const generateReport = () => {
    if (!formData.profileUrl || !formData.reportType) {
      alert('Please fill in the required fields')
      return
    }
    setShowInstructions(true)
  }

  const reportInstructions = `
Facebook Fake Account Report

Profile URL: ${formData.profileUrl}
Report Type: ${formData.reportType}
Description: ${formData.description}
Evidence: ${formData.evidence}

REPORTING INSTRUCTIONS:
1. Go to the fake profile: ${formData.profileUrl}
2. Click on the three dots (...) or "More" button on the profile
3. Select "Find support or report profile"
4. Choose the appropriate reason: ${formData.reportType}
5. Follow Facebook's prompts and provide additional details
6. Submit your report

Note: Facebook does not provide a public API for automated reporting. All reports must be submitted manually through their platform.
  `.trim()

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Shield className="h-12 w-12 text-blue-600 mr-3" />
            <h1 className="text-4xl font-bold text-gray-900">Facebook Fake Account Reporter</h1>
          </div>
          <p className="text-lg text-gray-600">
            A comprehensive tool to help you report fake Facebook accounts effectively
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <AlertTriangle className="h-5 w-5 mr-2 text-orange-500" />
                Report Details
              </CardTitle>
              <CardDescription>
                Fill in the information about the fake account you want to report
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="profileUrl">Profile URL *</Label>
                <Input
                  id="profileUrl"
                  placeholder="https://facebook.com/fake-profile"
                  value={formData.profileUrl}
                  onChange={(e) => handleInputChange('profileUrl', e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="reportType">Report Type *</Label>
                <Select onValueChange={(value) => handleInputChange('reportType', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select report type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="impersonation">Impersonation</SelectItem>
                    <SelectItem value="fake-identity">Fake Identity</SelectItem>
                    <SelectItem value="spam">Spam</SelectItem>
                    <SelectItem value="harassment">Harassment</SelectItem>
                    <SelectItem value="scam">Scam/Fraud</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Describe why you believe this is a fake account..."
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="evidence">Evidence/Additional Information</Label>
                <Textarea
                  id="evidence"
                  placeholder="Any additional evidence or information that supports your report..."
                  value={formData.evidence}
                  onChange={(e) => handleInputChange('evidence', e.target.value)}
                  rows={3}
                />
              </div>

              <Button onClick={generateReport} className="w-full">
                Generate Report Instructions
              </Button>
            </CardContent>
          </Card>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>How to Report</CardTitle>
                <CardDescription>
                  Step-by-step guide to report fake Facebook accounts
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ol className="list-decimal list-inside space-y-2 text-sm">
                  <li>Navigate to the fake profile</li>
                  <li>Click the three dots (...) or "More" button</li>
                  <li>Select "Find support or report profile"</li>
                  <li>Choose the appropriate reason</li>
                  <li>Provide additional details</li>
                  <li>Submit your report</li>
                </ol>
                <Alert className="mt-4">
                  <AlertTriangle className="h-4 w-4" />
                  <AlertDescription>
                    Facebook reviews reports manually. It may take time to see action taken.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Quick Links</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" className="w-full justify-start" asChild>
                  <a href="https://www.facebook.com/help/174210519303259/" target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Facebook Help: Report Impersonation
                  </a>
                </Button>
                <Button variant="outline" className="w-full justify-start" asChild>
                  <a href="https://www.facebook.com/help/contact/295309487309948/" target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Report Impostor Account
                  </a>
                </Button>
                <Button variant="outline" className="w-full justify-start" asChild>
                  <a href="https://transparency.meta.com/policies/community-standards/" target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Facebook Community Standards
                  </a>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {showInstructions && (
          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Report Instructions
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => copyToClipboard(reportInstructions)}
                >
                  {copied ? (
                    <>
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="h-4 w-4 mr-2" />
                      Copy
                    </>
                  )}
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <pre className="whitespace-pre-wrap text-sm bg-gray-50 p-4 rounded-lg border">
                {reportInstructions}
              </pre>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}

export default App

