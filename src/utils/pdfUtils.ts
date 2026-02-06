// utils/pdfUtils.ts
import RNFetchBlob from 'react-native-blob-util';
import Share from 'react-native-share';
import { Platform, Alert } from 'react-native';

export type Question = {
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
};

export type PDFSettings = {
  instituteName: string;
  testName: string;
  date: string;
  time: string;
  totalMarks: number;
  duration: string;
  instructions: string;
  wishMessage: string;
  showSolutions: boolean;
  showDateTime: boolean;
  showPageNumbers: boolean;
  logoUri?: string;
};

// Extract text from HTML (remove images)
const cleanHTML = (html: string): string => {
  if (!html) return '';
  
  return html
    .replace(/<img[^>]*>/g, '') // Remove images
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&')
    .replace(/&nbsp;/g, ' ')
    .replace(/<\/?[^>]+(>|$)/g, '') // Remove HTML tags
    .trim();
};

// Generate HTML content for PDF
const generateHTML = (
  questions: Question[],
  settings: PDFSettings
): string => {
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
      <hr class="question-separator"/>
    `;
  }).join('');

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    body {
      font-family: Arial, sans-serif;
      font-size: 12px;
      line-height: 1.5;
      color: #000;
      margin: 0;
      padding: 20px;
    }
    
    .header {
      text-align: center;
      border-bottom: 2px solid #333;
      padding-bottom: 15px;
      margin-bottom: 20px;
    }
    
    .institute-name {
      font-size: 20px;
      font-weight: bold;
      color: #2c3e50;
    }
    
    .test-name {
      font-size: 16px;
      color: #3498db;
      margin: 10px 0;
    }
    
    .paper-info {
      font-size: 12px;
      color: #666;
    }
    
    .instructions {
      background: #f8f9fa;
      border-left: 4px solid #3498db;
      padding: 10px;
      margin: 15px 0;
      border-radius: 4px;
    }
    
    .question {
      margin: 15px 0;
    }
    
    .question-number {
      font-weight: bold;
      float: left;
      width: 25px;
    }
    
    .question-content {
      margin-left: 25px;
    }
    
    .question-text {
      margin-bottom: 10px;
    }
    
    .options {
      margin-left: 15px;
    }
    
    .option {
      margin: 5px 0;
    }
    
    .option-label {
      font-weight: bold;
    }
    
    .solution {
      background: #f1f8e9;
      padding: 8px;
      margin: 8px 0;
      border-radius: 4px;
      border-left: 3px solid #4caf50;
    }
    
    .meta {
      font-size: 10px;
      color: #666;
      margin-top: 8px;
    }
    
    .question-separator {
      border: none;
      border-top: 1px dashed #ddd;
      margin: 20px 0;
    }
    
    .wish-message {
      text-align: center;
      font-style: italic;
      margin: 25px 0;
      color: #3498db;
      border-top: 1px solid #eee;
      padding-top: 15px;
    }
    
    .footer {
      text-align: center;
      font-size: 10px;
      color: #666;
      margin-top: 20px;
      padding-top: 10px;
      border-top: 1px solid #ddd;
    }
  </style>
</head>
<body> 
  <div class="header"> 
    <div class="institute-name">${settings.instituteName}</div>  
    <div class="test-name">${settings.testName}</div>
    
    ${settings.showDateTime ? `
      <div class="paper-info">  
        Date: ${settings.date} | Time: ${settings.time} | 
        Total Marks: ${settings.totalMarks} | Duration: ${settings.duration}
      </div>
    ` : ''}
  </div>
  
  ${settings.instructions ? `
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
      Page 1
    </div>
  ` : ''}
</body>
</html>
  `;
};

// Main PDF generation function
export const generateQuestionPaperPDF = async (
  questions: Question[],
  settings: PDFSettings
): Promise<{ filePath: string; fileName: string }> => {
  try {
    if (!questions || questions.length === 0) {
      throw new Error('No questions selected');
    }

    // 1. Generate HTML
    const htmlContent = generateHTML(questions, settings);
    
    // 2. Create file name
    const timestamp = new Date().getTime();
    const fileName = `${settings.testName.replace(/[^a-z0-9]/gi, '_')}_${timestamp}`;
    
    // 3. Get directory path
    const dirPath = Platform.select({
      ios: RNFetchBlob.fs.dirs.DocumentDir,
      android: RNFetchBlob.fs.dirs.DownloadDir,
    });
    
    // 4. File paths
    const htmlFilePath = `${dirPath}/${fileName}.html`;
    const pdfFilePath = `${dirPath}/${fileName}.pdf`;
    
    // 5. Write HTML file
    await RNFetchBlob.fs.writeFile(htmlFilePath, htmlContent, 'utf8');
    
    console.log('HTML saved at:', htmlFilePath);
    
    return {
      filePath: htmlFilePath,
      fileName: `${fileName}.html`,
    };
    
  } catch (error) {
    console.error('PDF Generation Error:', error);
    throw new Error('Failed to generate PDF');
  }
};

// Share PDF function
export const sharePDF = async (filePath: string, fileName: string) => {
  try {
    const shareOptions = {
      title: 'Share Question Paper',
      message: 'Here is the question paper',
      url: `file://${filePath}`,
      type: 'text/html',
      subject: 'Question Paper',
    };

    await Share.open(shareOptions);
  } catch (error) {
    console.error('Share Error:', error);
    // Fallback: Show file location
    Alert.alert(
      'File Saved',
      `File saved at: ${filePath}`,
      [{ text: 'OK' }]
    );
  }
};

// Simple PDF generation for your current setup
export const quickGeneratePDF = async (
  selectedQuestions: Question[],
  showSolutions: boolean,
  testName: string = 'Question Paper'
) => {
  const settings: PDFSettings = {
    instituteName: 'Your Institute',
    testName: testName,
    date: new Date().toLocaleDateString(),
    time: '2 Hours',
    totalMarks: selectedQuestions.reduce((sum, q) => sum + (q.question_marks || 0), 0),
    duration: '2 Hours',
    instructions: 'Answer all questions. Each question carries marks as indicated.',
    wishMessage: 'Best of Luck!',
    showSolutions: showSolutions,
    showDateTime: true,
    showPageNumbers: true,
  };

  return await generateQuestionPaperPDF(selectedQuestions, settings);
};