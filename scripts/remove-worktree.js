const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

function removeDockerContainer(containerName) {
    try {
        // Check if the container exists
        const existingContainers = execSync(`docker ps -a --filter "name=${containerName}" --format "{{.Names}}"`).toString();
        if (existingContainers.includes(containerName)) {
            console.log(`Removing Docker container: ${containerName}`);
            execSync(`docker rm -f ${containerName}`);
            console.log(`Container ${containerName} removed successfully.`);
        } else {
            console.log(`No Docker container found with the name: ${containerName}`);
        }
    } catch (error) {
        console.error('Error during Docker container removal:', error.message);
    }
}

function removeWorktrees(worktreeNames) {
    const worktreePath = path.join(process.cwd(), '.larry', 'worktrees');
    
    if (!fs.existsSync(worktreePath)) {
        console.error('Worktrees directory does not exist.');
        return;
    }

    try {
        if (worktreeNames.includes('--all')) {
            // Remove all worktrees
            fs.readdirSync(worktreePath).forEach((dir) => {
                console.log(`Removing worktree: ${dir}`);
                const fullPath = path.join(worktreePath, dir);
                execSync(`rm -rf ${fullPath}`);
                removeDockerContainer(`larry-worktree-${dir}`);
            });
        } else {
            // Remove specified worktrees
            worktreeNames.forEach((name) => {
                const fullPath = path.join(worktreePath, name);
                if (fs.existsSync(fullPath)) {
                    console.log(`Removing worktree: ${name}`);
                    execSync(`rm -rf ${fullPath}`);
                    removeDockerContainer(`larry-worktree-${name}`);
                } else {
                    console.error(`Worktree "${name}" does not exist.`);
                }
            });
        }
        
        execSync(`git worktree prune`);
        console.log('Cleanup complete.');
    } catch (error) {
        console.error('Error during worktree removal:', error.message);
    }
}

// Get arguments from command line
const args = process.argv.slice(2);
removeWorktrees(args);