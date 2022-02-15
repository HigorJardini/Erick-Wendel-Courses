#Environment
COLOR='\033[4;35m'
NC='\033[0m'

# Stop containers
echo ""
echo "${COLOR} ------ Disabled All Containers ------${NC}"
echo ""
docker-compose down

# Up containers
echo ""
echo "${COLOR} ------ Starting Containers ------${NC}"
echo ""
docker-compose up -d