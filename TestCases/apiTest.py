import pytest
from app import app, db
from create_db import Team, Player, League

@pytest.fixture
def client():
    app.config['TESTING'] = True
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///:memory:'  # Use in-memory SQLite database for testing
    with app.test_client() as client:
        with app.app_context():
            db.create_all()
            # Add sample data
            league = League(name="Premier League")
            db.session.add(league)
            db.session.commit()

            team = Team(name="Manchester United", league_id=league.id, address="Old Trafford", crest="crest.png",
                        website="https://www.manutd.com", venue="Old Trafford", founded=1878, coach="Erik ten Hag",
                        area="Manchester")
            db.session.add(team)
            db.session.commit()

            player = Player(name="Marcus Rashford", age=24, number=10, position="Forward", photo="rashford.png",
                            club=team.name)
            db.session.add(player)
            db.session.commit()
        yield client

def test_get_teams(client):
    """Test the GET /teams endpoint"""
    response = client.get('/teams')
    assert response.status_code == 200
    data = response.get_json()
    assert isinstance(data, list)
    assert len(data) == 1
    assert data[0]['name'] == "Manchester United"

def test_get_players(client):
    """Test the GET /players endpoint"""
    response = client.get('/players')
    assert response.status_code == 200
    data = response.get_json()
    assert isinstance(data, list)
    assert len(data) == 1
    assert data[0]['name'] == "Marcus Rashford"

def test_get_teams_by_league(client):
    """Test the GET /leagues/<string:league_name> endpoint"""
    response = client.get('/leagues/Premier League')
    assert response.status_code == 200
    data = response.get_json()
    assert isinstance(data, list)
    assert len(data) == 1
    assert data[0]['name'] == "Manchester United"

def test_get_player_by_name(client):
    """Test the GET /players/<string:name> endpoint"""
    response = client.get('/players/Marcus Rashford')
    assert response.status_code == 200
    data = response.get_json()
    assert isinstance(data, dict)
    assert data['name'] == "Marcus Rashford"

def test_get_players_by_team(client):
    """Test the GET /players/team/<string:team_name> endpoint"""
    response = client.get('/players/team/Manchester United')
    assert response.status_code == 200
    data = response.get_json()
    assert isinstance(data, list)
    assert len(data) == 1
    assert data[0]['name'] == "Marcus Rashford"

def test_get_teammates(client):
    """Test the GET /teammates/<string:player_name> endpoint"""
    response = client.get('/teammates/Marcus Rashford')
    assert response.status_code == 200
    data = response.get_json()
    assert isinstance(data, list)
    assert len(data) == 0  # Since there is only one player in the team

def test_get_standings_by_league_name(client):
    """Test the GET /standings/<string:league_name> endpoint"""
    league = League.query.filter_by(name="Premier League").first()
    team = Team.query.filter_by(name="Manchester United").first()
    standing = Standing(team_id=team.id, league_id=league.id, position=1, team_crest="crest.png",
                        points=99, games_won=32, games_lost=4, goals_for=85, goals_against=30, goal_difference=55,
                        team_name=team.name)
    db.session.add(standing)
    db.session.commit()
    
    response = client.get('/standings/Premier League')
    assert response.status_code == 200
    data = response.get_json()
    assert isinstance(data, list)
    assert len(data) == 1
    assert data[0]['team_name'] == "Manchester United"

def test_get_team_info(client):
    """Test the GET /club/<string:team_name> endpoint"""
    response = client.get('/club/Manchester United')
    assert response.status_code == 200
    data = response.get_json()
    assert isinstance(data, dict)
    assert data['name'] == "Manchester United"

def test_get_league_name(client):
    """Test the GET /league_name/<int:league_id> endpoint"""
    league = League.query.filter_by(name="Premier League").first()
    response = client.get(f'/league_name/{league.id}')
    assert response.status_code == 200
    data = response.get_json()
    assert isinstance(data, dict)
    assert data['league_name'] == "Premier League"
