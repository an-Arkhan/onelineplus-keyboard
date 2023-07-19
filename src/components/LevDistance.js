function levenshteinDistance(a, b) {
    const m = a.length;
    const n = b.length;
    const dp = [];
  
    for (let i = 0; i <= m; i++) {
      dp[i] = [];
      dp[i][0] = i;
    }
  
    for (let j = 0; j <= n; j++) {
      dp[0][j] = j;
    }
  
    for (let i = 1; i <= m; i++) {
      for (let j = 1; j <= n; j++) {
        if (a[i - 1] === b[j - 1]) {
          dp[i][j] = dp[i - 1][j - 1];
        } else {
          dp[i][j] =
            Math.min(
              dp[i - 1][j - 1], // substitution
              dp[i - 1][j], // deletion
              dp[i][j - 1] // insertion
            ) + 1;
        }
      }
    }
  
    return dp[m][n];
  }
  
  // Autocorrect function
  function autocorrect(input, dictionary, maxDistance) {
    const words = input.toLowerCase().split(" ");
    let output = "";
  
    for (let i = 0; i < words.length; i++) {
      const word = words[i];
      let minDistance = Infinity;
      let bestMatch = word;
  
      for (let j = 0; j < dictionary.length; j++) {
        const dictWord = dictionary[j];
        const distance = levenshteinDistance(word, dictWord);
  
        if (distance < minDistance && distance <= maxDistance) {
          minDistance = distance;
          bestMatch = dictWord;
        }
      }
  
      output += bestMatch + " ";
    }
  
    return output.trim();
  }
  
  // Example usage
  const inputText = "Hello, wrld! How are yoo?";
  const dictionary = ["hellon", "world", "how", "are", "you"];
  const maxDistance = 2;
  
  const correctedText = autocorrect(inputText, dictionary, maxDistance);
  console.log(correctedText);