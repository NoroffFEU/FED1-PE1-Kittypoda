export async function doDelete(url) {
  const token = localStorage.getItem('accessToken');
  if (!token) {
    console.error('No access token found');
    return false;
  }

  try {
    const response = await fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    if (response.ok) {
      console.log('Request successful');
      return true;
    } else {
      const errorText = await response.text();
      console.error(`Failed to delete: ${response.status} - ${response.statusText} - ${errorText}`);
      return false;
    }
  } catch (error) {
    console.error('Error during delete request:', error);
    return false;
  }
}
