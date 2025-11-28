import React, { useState } from 'react';
import { Bot, Sparkles, Loader2, AlertCircle, CheckCircle2 } from 'lucide-react';
import { Button, Card, CardContent, CardHeader, CardTitle, Input, Badge } from './ui';
import { diagnoseIssue } from '../services/geminiService';
import { DeviceType } from '../types';

interface SmartDiagnosisProps {
  deviceType?: DeviceType;
  onRepairSelect?: (repairId: string) => void;
}

export const SmartDiagnosis: React.FC<SmartDiagnosisProps> = ({ deviceType, onRepairSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ diagnosis: string; recommendedRepairId: string | null; confidence: string } | null>(null);

  const handleDiagnosis = async () => {
    if (!query.trim()) return;
    setLoading(true);
    setResult(null);
    
    const diagnosis = await diagnoseIssue(query, deviceType);
    setResult(diagnosis);
    setLoading(false);
  };

  if (!isOpen) {
    return (
      <Button 
        onClick={() => setIsOpen(true)}
        variant="outline" 
        className="w-full border-primary-200 bg-primary-50 text-primary-700 hover:bg-primary-100 hover:text-primary-800"
      >
        <Sparkles className="mr-2 h-4 w-4" />
        Not sure what's wrong? Ask AI
      </Button>
    );
  }

  return (
    <Card className="border-primary-200 bg-gradient-to-br from-white to-primary-50 mb-6">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg flex items-center text-primary-800">
            <Bot className="mr-2 h-5 w-5" />
            AI Diagnostics
          </CardTitle>
          <Button variant="ghost" size="sm" onClick={() => setIsOpen(false)}>Close</Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {!result && (
            <div className="flex gap-2">
              <Input
                placeholder="Describe the problem (e.g., 'My screen is cracked and has lines')"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleDiagnosis()}
                disabled={loading}
              />
              <Button onClick={handleDiagnosis} disabled={loading || !query}>
                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Analyze'}
              </Button>
            </div>
          )}

          {result && (
            <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
              <div className="p-4 bg-white rounded-lg border border-primary-100 shadow-sm">
                <div className="flex items-start gap-3">
                  {result.confidence === 'High' ? (
                    <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5" />
                  ) : (
                    <AlertCircle className="h-5 w-5 text-amber-500 mt-0.5" />
                  )}
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-1">Analysis Result</h4>
                    <p className="text-slate-600 text-sm mb-3">{result.diagnosis}</p>
                    
                    {result.recommendedRepairId && (
                       <div className="flex items-center gap-2 mt-2">
                         <span className="text-xs font-medium text-slate-500 uppercase tracking-wide">Suggestion:</span>
                         <Badge variant="default">
                           {result.recommendedRepairId}
                         </Badge>
                         {onRepairSelect && (
                           <Button 
                            size="sm" 
                            variant="secondary" 
                            className="h-7 text-xs ml-auto"
                            onClick={() => onRepairSelect(result.recommendedRepairId!)}
                           >
                             Select this repair
                           </Button>
                         )}
                       </div>
                    )}
                  </div>
                </div>
              </div>
              <Button variant="ghost" size="sm" className="mt-2 text-slate-400" onClick={() => setResult(null)}>
                Try another description
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
