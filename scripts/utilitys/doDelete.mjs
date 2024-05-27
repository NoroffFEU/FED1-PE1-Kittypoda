
export async function doDelete(url) {
  try {
    const token = localStorage.getItem('accessToken');
    const response = await fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    if (response.ok) {
      console.log('Post deleted successfully');
      return true;
    } else {
      console.error('Failed to delete post:', response.status, response.statusText);
      return false;
    }
  } catch (error) {
    console.error('Error deleting post:', error);
    return false;
  }
}

