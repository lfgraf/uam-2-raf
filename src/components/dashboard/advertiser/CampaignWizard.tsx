'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Textarea } from '@/components/ui/Textarea';
import { ArrowLeft, ArrowRight, Check } from 'lucide-react';
import Link from 'next/link';

interface WizardStep {
  id: string;
  title: string;
  description: string;
}

interface CampaignFormData {
  name: string;
  objective: string;
  audience: string;
  budget: string;
  bidStrategy: string;
  startDate: string;
  endDate: string;
  creatives: string[];
  landingUrl: string;
}

interface StepProps {
  formData: CampaignFormData;
  setFormData: (data: CampaignFormData) => void;
}

interface ReviewStepProps {
  formData: CampaignFormData;
}

const steps: WizardStep[] = [
  {
    id: 'basics',
    title: 'Campaign Basics',
    description: 'Set up your campaign name, objective, and target audience'
  },
  {
    id: 'budget',
    title: 'Budget & Schedule',
    description: 'Define your budget, bidding strategy, and campaign timeline'
  },
  {
    id: 'creative',
    title: 'Creative Assets',
    description: 'Upload and configure your ad creatives and landing pages'
  },
  {
    id: 'review',
    title: 'Review & Launch',
    description: 'Review your campaign settings and launch your campaign'
  }
];

export function CampaignWizard() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<CampaignFormData>({
    name: '',
    objective: '',
    audience: '',
    budget: '',
    bidStrategy: '',
    startDate: '',
    endDate: '',
    creatives: [],
    landingUrl: ''
  });

  const isLastStep = currentStep === steps.length - 1;
  const isFirstStep = currentStep === 0;

  const handleNext = () => {
    if (!isLastStep) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (!isFirstStep) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    console.log('Creating campaign:', formData);
    // TODO: Submit campaign data
  };

  const renderStepContent = () => {
    switch (steps[currentStep].id) {
      case 'basics':
        return <BasicsStep formData={formData} setFormData={setFormData} />;
      case 'budget':
        return <BudgetStep formData={formData} setFormData={setFormData} />;
      case 'creative':
        return <CreativeStep formData={formData} setFormData={setFormData} />;
      case 'review':
        return <ReviewStep formData={formData} />;
      default:
        return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link href="/dashboard/advertiser">
          <Button variant="ghost" size="sm" className="p-2">
            <ArrowLeft className="w-4 h-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl font-medium text-gray-900 dark:text-graphite-100">Create New Campaign</h1>
          <p className="text-gray-900 dark:text-graphite-300">Set up your advertising campaign step by step</p>
        </div>
      </div>

      {/* Progress Steps */}
      <div className="flex items-center justify-between">
        {steps.map((step, index) => (
          <div key={step.id} className="flex items-center flex-1">
            <div className="flex items-center">
              <div className={`
                w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium
                ${index < currentStep ? 'bg-acid text-graphite-950' :
                  index === currentStep ? 'bg-acid text-graphite-950' :
                  'bg-gray-100 dark:bg-graphite-800 text-gray-900 dark:text-graphite-300'}
              `}>
                {index < currentStep ? (
                  <Check className="w-4 h-4" />
                ) : (
                  index + 1
                )}
              </div>
              <div className="ml-3 hidden sm:block">
                <div className={`text-sm font-medium ${
                  index <= currentStep ? 'text-gray-900 dark:text-white' : 'text-gray-900 dark:text-graphite-300'
                }`}>
                  {step.title}
                </div>
              </div>
            </div>
            {index < steps.length - 1 && (
              <div className={`flex-1 h-px mx-4 ${
                index < currentStep ? 'bg-acid' : 'bg-border'
              }`} />
            )}
          </div>
        ))}
      </div>

      {/* Step Content */}
      <Card className="p-8">
        <div className="mb-6">
          <h2 className="text-xl font-medium text-gray-900 dark:text-graphite-100 mb-2">
            {steps[currentStep].title}
          </h2>
          <p className="text-gray-900 dark:text-graphite-300">
            {steps[currentStep].description}
          </p>
        </div>

        {renderStepContent()}
      </Card>

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          onClick={handlePrevious}
          disabled={isFirstStep}
        >
          Previous
        </Button>

        {isLastStep ? (
          <Button onClick={handleSubmit}>
            Launch Campaign
          </Button>
        ) : (
          <Button onClick={handleNext}>
            Next Step
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        )}
      </div>
    </div>
  );
}

function BasicsStep({ formData, setFormData }: StepProps) {
  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-900 dark:text-graphite-100 mb-2">
          Campaign Name
        </label>
        <Input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          placeholder="Enter campaign name..."
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-900 dark:text-graphite-100 mb-2">
          Campaign Objective
        </label>
        <Select
          value={formData.objective}
          onChange={(e) => setFormData({ ...formData, objective: e.target.value })}
        >
          <option value="">Select objective...</option>
          <option value="awareness">Brand Awareness</option>
          <option value="traffic">Website Traffic</option>
          <option value="conversions">Conversions</option>
          <option value="app-installs">App Installs</option>
        </Select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-900 dark:text-graphite-100 mb-2">
          Target Audience
        </label>
        <Textarea
          value={formData.audience}
          onChange={(e) => setFormData({ ...formData, audience: e.target.value })}
          placeholder="Describe your target audience..."
          rows={4}
        />
      </div>
    </div>
  );
}

function BudgetStep({ formData, setFormData }: StepProps) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-900 dark:text-graphite-100 mb-2">
            Total Budget ($)
          </label>
          <Input
            type="number"
            value={formData.budget}
            onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
            placeholder="5000"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-900 dark:text-graphite-100 mb-2">
            Bidding Strategy
          </label>
          <Select
            value={formData.bidStrategy}
            onChange={(e) => setFormData({ ...formData, bidStrategy: e.target.value })}
          >
            <option value="">Select strategy...</option>
            <option value="cpc">Cost Per Click (CPC)</option>
            <option value="cpm">Cost Per Mille (CPM)</option>
            <option value="cpa">Cost Per Acquisition (CPA)</option>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-900 dark:text-graphite-100 mb-2">
            Start Date
          </label>
          <Input
            type="date"
            value={formData.startDate}
            onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-900 dark:text-graphite-100 mb-2">
            End Date
          </label>
          <Input
            type="date"
            value={formData.endDate}
            onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
          />
        </div>
      </div>
    </div>
  );
}

function CreativeStep({ formData, setFormData }: StepProps) {
  // Future: integrate file upload and form data handling
  return (
    <div className="space-y-6">
      <div className="border-2 border-dashed border-gray-200 dark:border-graphite-700 rounded-lg p-8 text-center">
        <div className="text-gray-900 dark:text-graphite-300 mb-4">
          <svg className="w-12 h-12 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
          </svg>
          Upload your creative assets
        </div>
        <Button variant="outline">
          Choose Files
        </Button>
        <p className="text-sm text-gray-900 dark:text-graphite-500 mt-2">
          Supported formats: JPG, PNG, MP4, GIF (max 10MB)
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-900 dark:text-graphite-100 mb-2">
          Landing Page URL
        </label>
        <Input
          type="url"
          value={formData.landingUrl}
          onChange={(e) => setFormData({ ...formData, landingUrl: e.target.value })}
          placeholder="https://your-landing-page.com"
        />
      </div>
    </div>
  );
}

function ReviewStep({ formData }: ReviewStepProps) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h3 className="font-medium text-gray-900 dark:text-graphite-100">Campaign Details</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-900 dark:text-graphite-300">Name:</span>
              <span className="text-gray-900 dark:text-graphite-100">{formData.name || 'Not set'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-900 dark:text-graphite-300">Objective:</span>
              <span className="text-gray-900 dark:text-graphite-100">{formData.objective || 'Not set'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-900 dark:text-graphite-300">Budget:</span>
              <span className="text-gray-900 dark:text-graphite-100">${formData.budget || '0'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-900 dark:text-graphite-300">Bid Strategy:</span>
              <span className="text-gray-900 dark:text-graphite-100">{formData.bidStrategy || 'Not set'}</span>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="font-medium text-gray-900 dark:text-graphite-100">Schedule</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-900 dark:text-graphite-300">Start Date:</span>
              <span className="text-gray-900 dark:text-graphite-100">{formData.startDate || 'Not set'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-900 dark:text-graphite-300">End Date:</span>
              <span className="text-gray-900 dark:text-graphite-100">{formData.endDate || 'Not set'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-900 dark:text-graphite-300">Landing URL:</span>
              <span className="text-gray-900 dark:text-graphite-100">{formData.landingUrl || 'Not set'}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-acid/5 border border-acid/20 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <div className="w-5 h-5 bg-acid rounded-full flex items-center justify-center mt-0.5">
            <Check className="w-3 h-3 text-graphite-950" />
          </div>
          <div>
            <div className="font-medium text-gray-900 dark:text-graphite-100">Ready to Launch</div>
            <div className="text-sm text-gray-900 dark:text-graphite-300 mt-1">
              Your campaign will be submitted for review and should be live within 24 hours.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}