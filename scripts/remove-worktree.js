const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

function removeWorktrees(worktreeNames) {
    const worktreePath = path.join(process.cwd(), '.larry', 'worktrees');
    
    if (!fs.existsSync(worktreePath)) {
        console.error('Worktrees directory does not exist.');
        return;
    }
    console.log(`Removing worktrees from: ${worktreePath}`);

    try {
        if (worktreeNames.includes('--all')) {
            // Remove all worktrees
            console.log(fs.readdirSync(worktreePath))
            fs.readdirSync(worktreePath).forEach((dir) => {
                const fullPath = path.join(worktreePath, dir);
                console.log(`Removing worktree: ${dir}`);
                execSync(`rm -rf ${fullPath}`);
                execSync(`git worktree prune`);
            });
        } else {
            // Remove specified worktrees
            worktreeNames.forEach((name) => {
                const fullPath = path.join(worktreePath, name);
                if (fs.existsSync(fullPath)) {
                    console.log(`Removing worktree: ${name}`);
                    execSync(`rm -rf ${fullPath}`);
                    execSync(`git worktree prune`);
                } else {
                    console.error(`Worktree "${name}" does not exist.`);
                }
            });
        }

        console.log('Cleanup complete.');
    } catch (error) {
        console.error('Error during worktree removal:', error.message);
    }
}

// Get arguments from command line
const args = process.argv.slice(2);
console.log(args)
console.log(process.argv)
removeWorktrees(args);