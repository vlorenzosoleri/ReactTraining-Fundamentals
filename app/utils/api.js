import axios from 'axios';

const fetchPopularRepos = (language) => {
    const encodedURI = window.encodeURI('https://api.github.com/search/repositories?q=stars:>1+language:' + language + '&sort=stars&order=desc&type=Repositories');
    return axios.get(encodedURI)
        .then(res => res.data.items);
};

const getProfile = (username) => {
    return axios
        .get(`https://api.github.com/users/${username}`)
        .then(user => user.data);
};

const getRepos = (username) => {
    return axios
        .get(`https://api.github.com/users/${username}/repos?per_page=100`);
};

const getStarCount = (repos) => {
    return repos.data.reduce((count, repo) => count + repo.stargazers_count, 0);
};

const calculateScore = (profile, repos) => {
    const followers = profile.followers;
    const totalStars = getStarCount(repos);

    return followers * 3 + totalStars;
}

const handleError = err => {
    console.warn(err);
    return null;
}

const getUserData = player => {
    return axios
        .all([
            getProfile(player),
            getRepos(player)
        ])
        .then(data => {
            const profile = data[0];
            const repos = data[1];

            return {
                profile,
                score: calculateScore(profile, repos)
            };
        });
}

const sortPlayers = players => {
    return players.sort((a, b) => b.score - a.score);
}

const battle = (players) => {
    return axios
        .all(players.map(getUserData))
        .then(sortPlayers);
};

export {fetchPopularRepos, battle};