"use client";

export interface ArticleDetail {
  url: string;
  title: string;
  abstract: string;
  byline: string;
  published_date: string;
  section: string;
  subsection: string;
  multimedia: Multimedia[];
  content?: string;
}

export interface Multimedia {
  url: string;
  format: string;
  height: number;
  width: number;
  type: string;
  subtype: string;
  caption: string;
  copyright: string;
}

// 注意：NYT API 不直接提供完整文章内容
// 这个函数主要用于获取文章的元数据
export const fetchArticleDetail = async (url: string): Promise<ArticleDetail> => {
  try {
    // 由于 NYT API 限制，我们无法直接获取完整文章内容
    // 但我们可以解析 URL 来获取基本信息
    const urlObj = new URL(url);
    const pathParts = urlObj.pathname.split('/').filter(Boolean);

    return {
      url,
      title: 'Article Title', // 这里需要从其他地方获取
      abstract: 'Article abstract...',
      byline: 'By Author',
      published_date: new Date().toISOString(),
      section: pathParts[1] || 'general',
      subsection: pathParts[2] || '',
      multimedia: [],
    };
  } catch (error) {
    console.error('Error fetching article detail:', error);
    throw error;
  }
};

// 创建一个模拟的完整文章内容（实际项目中需要集成其他服务）
export const getArticleContent = async (url: string): Promise<string> => {
  // 这里可以集成第三方服务如 Readability API 或其他内容提取服务
  // 目前返回一个占位符
  console.log('Fetching content for URL:', url); // 使用 url 参数避免未使用警告

  return `
    <div class="article-content">
      <p>This is a placeholder for the full article content. In a real implementation, you would integrate with services like:</p>
      <ul>
        <li>Readability API</li>
        <li>Mercury Web Parser</li>
        <li>Diffbot Article API</li>
        <li>Or implement your own content extraction</li>
      </ul>
      <p>For now, you can click the "Read Full Article" button to view the original article on The New York Times website.</p>
      <p><strong>Article URL:</strong> <a href="${url}" target="_blank" rel="noopener noreferrer">${url}</a></p>
    </div>
  `;
};
