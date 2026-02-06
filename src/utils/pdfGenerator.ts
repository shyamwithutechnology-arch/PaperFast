// utils/pdfGenerator.ts
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import { Platform } from 'react-native';
import RNFS from 'react-native-fs';

// ===== TYPES =====
export interface Question {
  question_id: string;
  question_text: string;
  question_type: string;
  option_a: string;
  option_b: string;
  option_c: string;
  option_d: string;
  correct_option: string;
  explanation: string;
  board_name: string;
  class_name: string;
  subject_name: string;
  book_title: string | null;
  dlevel_name: string;
  medium_name: string;
  question_marks: number | null;
  question_chapter: string;
  question_practice: string;
  question_subtopic: string | null;
}

export interface PDFSettings {
  // Basic Info
  instituteName: string;
  testName: string;
  date: string;
  time: string;
  
  // Display Options
  showDateTime: boolean;
  showPageNumbers: boolean;
  showInstructions: boolean;
  showSolutions: boolean;
  
  // Customizations
  watermark: {
    type: 'none' | 'text' | 'logo';
    text?: string;
    logoUri?: string;
    opacity: number;
  };
  
  border: {
    type: 'none' | 'simple' | 'ornamental';
    color?: string;
    thickness: number;
  };
  
  // Layout
  headerType: 'simple' | 'detailed' | 'academic';
  fontFamily: 'english' | 'hindi' | 'mixed';
  fontSize: number;
  
  // Content
  instructions: string;
  wishMessage: string;
  totalMarks: number;
  duration: string;
  
  // Images
  logoUri?: string;
  signatureUri?: string;
}

// ===== HELPER FUNCTIONS =====

// Convert image to base64 for PDF
const imageToBase64 = async (uri: string): Promise<string> => {
  try {
    const base64 = await RNFS.readFile(uri, 'base64');
    const extension = uri.split('.').pop()?.toLowerCase() || 'jpg';
    return `data:image/${extension};base64,${base64}`;
  } catch {
    return '';
  }
};

// Clean HTML for PDF
const cleanHTML = (html: string): string => {
  if (!html) return '';
  
  return html
    .replace(/<img[^>]*>/g, '[IMAGE]')  // Replace images with placeholder
    .replace(/<br\s*\/?>/gi, '<br/>')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&')
    .replace(/&nbsp;/g, ' ')
    .replace(/<\/?[^>]+(>|$)/g, '')  // Remove HTML tags
    .trim();
};

// Get font CSS based on selection
const getFontCSS = (fontFamily: string): string => {
  switch (fontFamily) {
    case 'hindi':
      return `
        @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+Devanagari:wght@400;500;600;700&display=swap');
        body, .hindi { font-family: 'Noto Sans Devanagari', Arial, sans-serif; }
      `;
    case 'mixed':
      return `
        @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+Devanagari:wght@400;500;600;700&family=Roboto:wght@400;500;700&display=swap');
        body { font-family: 'Roboto', 'Noto Sans Devanagari', sans-serif; }
        .hindi { font-family: 'Noto Sans Devanagari', sans-serif; }
        .english { font-family: 'Roboto', sans-serif; }
      `;
    default: // english
      return `
        body { font-family: 'Helvetica', 'Arial', sans-serif; }
      `;
  }
};

// ===== MAIN PDF GENERATION =====

export const generateQuestionPaperPDF = async (
  questions: Question[],
  settings: PDFSettings
): Promise<{ filePath: string; fileName: string }> => {
  try {
    // 1. Prepare images
    let logoBase64 = '';
    if (settings.logoUri) {
      logoBase64 = await imageToBase64(settings.logoUri);
    }

    let watermarkBase64 = '';
    if (settings.watermark.type === 'logo' && settings.watermark.logoUri) {
      watermarkBase64 = await imageToBase64(settings.watermark.logoUri);
    }

    // 2. Generate HTML for all questions
    const questionsHTML = questions.map((q, index) => {
      const questionText = cleanHTML(q.question_text);
      const options = [
        { label: 'A', text: cleanHTML(q.option_a || '') },
        { label: 'B', text: cleanHTML(q.option_b || '') },
        { label: 'C', text: cleanHTML(q.option_c || '') },
        { label: 'D', text: cleanHTML(q.option_d || '') },
      ];

      return `
        <div class="question">
          <div class="question-number">${index + 1}.</div>
          <div class="question-content">
            <div class="question-text">${questionText}</div>
            
            <div class="options">
              ${options.map(opt => `
                <div class="option">
                  <span class="option-label">(${opt.label})</span>
                  <span class="option-text">${opt.text}</span>
                </div>
              `).join('')}
            </div>
            
            ${settings.showSolutions && q.explanation ? `
              <div class="solution">
                <strong>Solution:</strong> ${cleanHTML(q.explanation)}
                ${q.correct_option ? `<br/><strong>Answer:</strong> Option ${q.correct_option}` : ''}
              </div>
            ` : ''}
            
            <div class="meta">
              ${q.question_marks ? `<span>Marks: ${q.question_marks}</span>` : ''}
              ${q.dlevel_name ? `<span>Level: ${q.dlevel_name}</span>` : ''}
            </div>
          </div>
        </div>
        
        ${index < questions.length - 1 ? '<hr class="question-separator"/>' : ''}
      `;
    }).join('');

    // 3. Build complete HTML
    const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    ${getFontCSS(settings.fontFamily)}
    
    @page {
      margin: 20mm;
    }
    
    body {
      font-size: ${settings.fontSize}px;
      line-height: 1.6;
      color: #000;
    }
    
    /* Header */
    .header {
      text-align: center;
      margin-bottom: 25px;
      padding-bottom: 15px;
      border-bottom: 2px solid #333;
    }
    
    .institute-logo {
      max-height: 80px;
      margin-bottom: 10px;
    }
    
    .institute-name {
      font-size: 22px;
      font-weight: bold;
      color: #2c3e50;
    }
    
    .test-name {
      font-size: 18px;
      color: #3498db;
      margin: 10px 0;
    }
    
    .paper-info {
      font-size: 14px;
      color: #666;
      margin-top: 10px;
    }
    
    /* Instructions */
    .instructions {
      background: #f8f9fa;
      border-left: 4px solid #3498db;
      padding: 15px;
      margin: 20px 0;
      border-radius: 4px;
    }
    
    /* Questions */
    .question {
      margin: 20px 0;
      page-break-inside: avoid;
    }
    
    .question-number {
      font-weight: bold;
      float: left;
      width: 30px;
    }
    
    .question-content {
      margin-left: 30px;
    }
    
    .question-text {
      margin-bottom: 15px;
    }
    
    .options {
      margin-left: 20px;
    }
    
    .option {
      margin: 5px 0;
    }
    
    .option-label {
      font-weight: bold;
      color: #2c3e50;
    }
    
    .solution {
      background: #f1f8e9;
      padding: 10px;
      margin: 10px 0;
      border-radius: 4px;
      border-left: 3px solid #4caf50;
    }
    
    .meta {
      font-size: 12px;
      color: #666;
      margin-top: 10px;
    }
    
    .question-separator {
      border: none;
      border-top: 1px dashed #ddd;
      margin: 25px 0;
    }
    
    /* Watermark */
    .watermark {
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%) rotate(-45deg);
      font-size: 60px;
      color: rgba(0,0,0,0.1);
      z-index: -1;
      white-space: nowrap;
    }
    
    /* Footer */
    .footer {
      position: fixed;
      bottom: 0;
      width: 100%;
      text-align: center;
      font-size: 11px;
      color: #666;
      padding: 10px;
    }
    
    /* Wish Message */
    .wish-message {
      text-align: center;
      font-style: italic;
      margin: 30px 0;
      color: #3498db;
      padding-top: 20px;
      border-top: 1px solid #eee;
    }
  </style>
</head>
<body>
  ${settings.watermark.type === 'text' && settings.watermark.text ? 
    `<div class="watermark" style="opacity: ${settings.watermark.opacity}">${settings.watermark.text}</div>` : ''}
  
  ${settings.watermark.type === 'logo' && watermarkBase64 ? 
    `<div class="watermark" style="opacity: ${settings.watermark.opacity}">
      <img src="${watermarkBase64}" style="width: 400px; opacity: 0.1;" />
    </div>` : ''}
  
  <div class="header">
    ${logoBase64 ? `<img src="${logoBase64}" class="institute-logo" />` : ''}
    
    <div class="institute-name">${settings.instituteName}</div>
    <div class="test-name">${settings.testName}</div>
    
    ${settings.showDateTime ? `
      <div class="paper-info">
        Date: ${settings.date} | Time: ${settings.time} | 
        Total Marks: ${settings.totalMarks} | Duration: ${settings.duration}
      </div>
    ` : ''}
  </div>
  
  ${settings.showInstructions && settings.instructions ? `
    <div class="instructions">
      <strong>Instructions:</strong><br/>
      ${settings.instructions}
    </div>
  ` : ''}
  
  <div class="questions">
    ${questionsHTML}
  </div>
  
  ${settings.wishMessage ? `
    <div class="wish-message">
      ${settings.wishMessage}
    </div>
  ` : ''}
  
  ${settings.showPageNumbers ? `
    <div class="footer">
      Page <span class="page-number">1</span>
    </div>
  ` : ''}
</body>
</html>
    `;

    // 4. Generate PDF file
    const fileName = `${settings.testName.replace(/[^a-z0-9]/gi, '_')}_${Date.now()}.pdf`;
    
    const pdf = await RNHTMLtoPDF.convert({
      html,
      fileName,
      directory: Platform.OS === 'ios' ? 'Documents' : 'Download',
      base64: false,
      height: 842, // A4
      width: 595,
      padding: 20,
    });

    if (!pdf.filePath) {
      throw new Error('PDF generation failed');
    }

    return {
      filePath: pdf.filePath,
      fileName,
    };

  } catch (error) {
    console.error('PDF Generation Error:', error);
    throw new Error('Failed to generate PDF');
  }
};