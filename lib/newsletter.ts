'use server';

const API_URL = 'https://api.convertkit.com/v3/';

export const convertkitSubscribe = async (email: string) => {
  const FORM_ID = process.env.CONVERTKIT_FORM_ID;
  const API_KEY = process.env.CONVERTKIT_API_KEY;

  const data = { email, api_key: API_KEY };

  const response = await fetch(`${API_URL}forms/${FORM_ID}/subscribe`, {
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
  });

  if (response.status >= 400) {
    return {
      error: `There was an error subscribing to the list.`,
    };
  }
  return {
    message: 'Successfully subscribed to the newsletter',
  };
};

export const convertkitUnsubscribe = async (email: string) => {
  const API_SECRET = process.env.CONVERTKIT_API_SECRET;

  try {
    const response = await fetch(`${API_URL}unsubscribe`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        api_secret: API_SECRET,
        email: email,
      }),
    });

    if (!response.ok) {
      return {
        error: `Failed to unsubscribe: ${response.status}`,
      };
    }

    return {
      message: 'Successfully unsubscribed from the newsletter',
    };
  } catch (error) {
    console.error('Error unsubscribing from ConvertKit:', error);
    return {
      error: 'There was an error processing your unsubscribe request',
    };
  }
};

export const getConvertkitTotalSubscribers = async () => {
  const API_SECRET = process.env.CONVERTKIT_API_SECRET;

  try {
    const response = await fetch(
      `${API_URL}subscribers?api_secret=${API_SECRET}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      throw new Error(`ConvertKit API error: ${response.status}`);
    }

    const result = await response.json();
    return {
      totalSubscribers: result.total_subscribers,
    };
  } catch (error) {
    console.error('Error fetching ConvertKit subscribers:', error);
  }
};
